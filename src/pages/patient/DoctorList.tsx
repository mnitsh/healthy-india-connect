import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Stethoscope, Building, Award, PlusCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  hospital: string;
  experience: number;
  isAssigned: boolean;
}

interface DoctorListProps {
    onBookSuccess: () => void;
}

const DoctorList = ({ onBookSuccess }: DoctorListProps) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBooking, setIsBooking] = useState<string | null>(null);

  const userToken = localStorage.getItem('userToken');

  useEffect(() => {
    const fetchDoctors = async () => {
      if (!userToken) return;

      try {
        const response = await fetch('http://localhost:5000/api/doctors/list', {
          headers: {
            'Authorization': `Bearer ${userToken}`,
          },
        });
        const result = await response.json();

        if (response.ok) {
          setDoctors(result);
        } else {
          toast.error(result.message || "Failed to load doctor list.");
        }
      } catch (error) {
        toast.error("Network error fetching doctor list.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, [userToken]);

  const handleBook = async (doctorId: string, doctorName: string) => {
    if (!userToken) {
        toast.error("Please log in to book a doctor.");
        return;
    }
    setIsBooking(doctorId);

    try {
      const response = await fetch('http://localhost:5000/api/doctors/assign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify({ doctorId }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(`Successfully booked Dr. ${doctorName}! Your health data is now visible to them for personalized advice.`);
        
        // FIX: Immediately update the local state to show 'Assigned' and prevent rebooking
        setDoctors(prev => prev.map(doc => doc.id === doctorId ? { ...doc, isAssigned: true } : doc));
        
        onBookSuccess(); // This closes the modal and triggers the dashboard refresh
      } else {
        toast.error(result.message || "Booking failed.");
      }
    } catch (error) {
      toast.error("Network error during booking.");
    } finally {
      setIsBooking(null);
    }
  };

  if (isLoading) {
    return <p className="text-center text-muted-foreground py-4">Loading doctors...</p>;
  }

  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
      {doctors.length === 0 && <p className="text-center text-muted-foreground py-4">No doctors registered yet.</p>}
      {doctors.map((doctor) => (
        <Card key={doctor.id} className="shadow-sm">
          <CardContent className="p-4 flex justify-between items-center">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-accent" />
                <h4 className="text-lg font-semibold">{doctor.name}</h4>
              </div>
              <CardDescription className="pl-7">{doctor.specialization}</CardDescription>
              <div className="flex items-center text-xs text-muted-foreground pl-7 pt-1 gap-4">
                <div className="flex items-center">
                  <Building className="h-3 w-3 mr-1" />
                  {doctor.hospital}
                </div>
                <div className="flex items-center">
                  <Award className="h-3 w-3 mr-1" />
                  {doctor.experience} Yrs Exp.
                </div>
              </div>
            </div>
            
            {doctor.isAssigned ? (
                <Button variant="success" disabled>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Assigned
                </Button>
            ) : (
                <Button 
                    variant="accent" 
                    // FIX: Pass doctor.name here
                    onClick={() => handleBook(doctor.id, doctor.name)} 
                    disabled={isBooking !== null}
                >
                    {isBooking === doctor.id ? (
                        "Booking..."
                    ) : (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Book
                        </>
                    )}
                </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DoctorList;