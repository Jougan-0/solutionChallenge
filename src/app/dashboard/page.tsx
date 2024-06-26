"use client"
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useRouter } from 'next/navigation';
import SignOutButton from '../../components/singout';
import PathwaysButton from '../../components/pathwayButton';
import HomeButton from '@/components/homeButton';

import { FaEdit } from 'react-icons/fa';

interface Location {
  _id: string;
  locationId: string;
  name: string;
  students: { studentId: string; name: string; age: number;level:number;Image:string,fatherName:string,school:string,division:string,phoneNumber:number }[];
  __v: number;
}
interface Student {
  studentId: string;
  name: string;
  age: number;
  level:number;
  Image:string;
  fatherName:string;
  school:string;
  division:string;
  phoneNumber:number;
  // Add other properties if needed
}
interface AddStudentModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>,image: string | null) => void;
  studentName: string;
  setStudentName: React.Dispatch<React.SetStateAction<string>>;
  locationName: string;
  setLocationName: React.Dispatch<React.SetStateAction<string>>;
  age: string;
  setAge: React.Dispatch<React.SetStateAction<string>>;
  level: string;
  setLevel: React.Dispatch<React.SetStateAction<string>>;
  fatherName:string;
  setFatherName: React.Dispatch<React.SetStateAction<string>>;
  school:string;
  setSchool: React.Dispatch<React.SetStateAction<string>>;
  division:string;
  setDivision: React.Dispatch<React.SetStateAction<string>>;
  phoneNumber:string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
}
const EditStudentModal: React.FC<{
  isOpen: boolean;
  closeModal: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>,Image:string) => void;
  studentName: string;
  setStudentName: React.Dispatch<React.SetStateAction<string>>;
  age: string;
  setAge: React.Dispatch<React.SetStateAction<string>>;
  level: string;
  setLevel: React.Dispatch<React.SetStateAction<string>>;
  studentImage: string;
  setStudentImage: React.Dispatch<React.SetStateAction<string>>;
  fatherName:string;
  setFatherName: React.Dispatch<React.SetStateAction<string>>;
  school:string;
  setSchool: React.Dispatch<React.SetStateAction<string>>;
  division:string;
  setDivision: React.Dispatch<React.SetStateAction<string>>;
  phoneNumber:string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
}> = ({ isOpen, closeModal, handleSubmit, studentName, setStudentName, age, setAge, level, setLevel, studentImage, setStudentImage }) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(age,level,studentName+"his")
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStudentImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleModalClose = () => {
    if (studentImage !== "") {
      setStudentImage(studentImage);
    }
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleModalClose}
      style={{
        content: {
          width: '500px',
          height: '500px',
          margin: 'auto',
          padding: '20px',
          borderRadius: '20px',

          background: '#fff',
          overflow: 'hidden',
        },
        overlay: {
          background: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50%', marginBottom: '0px' }}>
        <label htmlFor="imageInput">
        <div id="cont">
        <div id="box">
          <img className='border-gradient'
            src={studentImage||'/images/profile-white.svg'}
            alt="Student"
            style={{   width: '150px',
            height: '150px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            objectFit: 'cover', 
           }}
          />
          </div>
          </div>
          <input id="imageInput" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
        </label>
      </div>
      <form
        onSubmit={(e) => handleSubmit(e,studentImage)}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <label style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder={studentName}
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            style={{
              background: 'transparent',
              color: 'black',
              fontSize: '16px',
              border: '1px solid black',
              padding: '5px 10px',
              transition: 'background 0.3s',
            }}
          />
        </label>
        <label style={{ marginBottom: '10px' }}>
          <input
            type="number"
            placeholder={age}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={{
              background: 'transparent',
              color: 'black',
              fontSize: '16px',
              border: '1px solid black',
              padding: '5px 10px',
              transition: 'background 0.3s',
            }}
          />
        </label>
        <label style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder={level}
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            style={{
              background: 'transparent',
              color: 'black',
              fontSize: '16px',
              border: '1px solid black',
              padding: '5px 10px',
              transition: 'background 0.3s',
            }}
          />
        </label>
        <button
          type="submit"
          className="text-xl text-white"
          style={{
            transition: 'background-color 0.3s, padding 0.3s',
            backgroundColor: 'rgba(0, 0, 0,0.5)',
            padding: '5px 15px',
            border: 'none',
            borderRadius: '10px',
            marginTop: '10px',
          }}
          onMouseEnter={(e) => {
            const target = e.target as HTMLButtonElement;
            target.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            target.style.padding = '5px 20px';

          }}
          onMouseLeave={(e) => {
            const target = e.target as HTMLButtonElement;
            target.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            target.style.padding = '5px 15px';
          }}
        >
          Save
        </button>
      </form>
    </Modal>
  );
};




const AddStudentModal: React.FC<AddStudentModalProps> = ({ isOpen, closeModal, handleSubmit, studentName, setStudentName, locationName, setLocationName, age, setAge, level, setLevel }) => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64Image = reader.result?.toString();
        if (base64Image) {
          setImage(base64Image);
        }
      };
      reader.onerror = (error) => {
        console.error('Error converting image to base64:', error);
      };
    }
  };
  
    return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={{
      content: {
        width: '500px',
        height: '500px',
        margin: 'auto',
        padding: '20px',
        borderRadius: '10px',
        border: '1px solid black',
        background: '#1C708D',
        overflow: 'hidden',
      },
      overlay: {
        background: 'rgba(0, 0, 0, 0.5)',
      },
    }}>
     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50%', marginBottom: '0px' }}>
  <label htmlFor="upload-image">
    {image && (
      <img
        src={image}
        alt="Selected"
        style={{ width: '200px', height: '200px', borderRadius:"50%",objectFit: 'cover', cursor: 'pointer' }}
      />
    )}
    {!image && (
      <div style={{ width: '200px', height: '200px', backgroundColor: '#f0f0f0', cursor: 'pointer', display: 'flex', justifyContent: 'center', borderRadius:"50%",alignItems: 'center',textAlign:"center" }}>
        Upload Image
      </div>
    )}
    <input id="upload-image" type="file" onChange={handleImageChange} style={{ display: 'none' }} />
  </label>
</div>

<form onSubmit={(e) => handleSubmit(e,image)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <label style={{ marginBottom: '10px' }}>
    <input 
      type="text" 
      placeholder="Enter student name" 
      value={studentName} 
      onChange={(e) => setStudentName(e.target.value)} 
      style={{ 
        background: 'transparent', 
        color: 'white', 
        fontSize: '16px',
        border: '1px solid black',
        padding: '5px 10px',
        transition: 'background 0.3s',
      }}
    />
  </label>
  <label style={{ marginBottom: '10px' }}>
    <input 
      type="text" 
      placeholder="Enter location name" 
      value={locationName} 
      onChange={(e) => setLocationName(e.target.value)} 
      style={{ 
        background: 'transparent', 
        color: 'white', 
        fontSize: '16px',
        border: '1px solid black',
        padding: '5px 10px',
        transition: 'background 0.3s',
      }}
    />
  </label>
  <label style={{ marginBottom: '10px' }}>
    <input 
      type="number" 
      placeholder="Enter age" 
      value={age} 
      onChange={(e) => setAge(e.target.value)} 
      style={{ 
        background: 'transparent', 
        color: 'white', 
        fontSize: '16px',
        border: '1px solid black',
        padding: '5px 10px',
        transition: 'background 0.3s',
      }}
    />
  </label>
  <label style={{ marginBottom: '10px' }}>
    <input 
      type="text" 
      placeholder="Enter level" 
      value={level} 
      onChange={(e) => setLevel(e.target.value)} 
      style={{ 
        background: 'transparent', 
        color: 'white', 
        fontSize: '16px',
        border: '1px solid black',
        padding: '5px 10px',
        transition: 'background 0.3s',
      }}
    />
  </label>
  <button
  type='submit'
  className='text-xl text-white'
  style={{
    transition: 'background-color 0.3s, padding 0.3s',
    backgroundColor: 'rgba(0, 0, 0)',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '10px',
    marginTop: '5px',
    marginBottom: '5px',
  }}
  onMouseEnter={(e) => {
    const target = e.target as HTMLButtonElement; 
    target.style.backgroundColor = 'rgba(0, 0, 0, 0.3)'; 
    ; 
  }}
  onMouseLeave={(e) => {
    const target = e.target as HTMLButtonElement; 
    target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'; 
    target.style.padding = '5px 10px';
  }}
>
Add Student
</button></form>

    </Modal>
  );
};




const Page: React.FC =() => {
  
  const [locations, setLocations] = useState<{ _id: string; locationId: string; locationName: string }[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<string>('');
  const [students, setStudents] = useState<{ studentId: string; name: string; age: number;level:number;Image:string;fatherName:string;school:string;division:string;phoneNumber:number; }[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>('');
  const [locationName, setLocationName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [division, setdivision] = useState<string>('');
  const [fatherName, setFatherName] = useState<string>('');
  const [school, setSchool] = useState<string>('');

  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const [level, setLevel] = useState<string>('');
  const router = useRouter();
  const [bgColor, setBgColor] = useState<string>('rgb(30,103,126)');

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [studentImage, setStudentImage] = useState<string>('');

  
  const openEditModal = (studentId: string,studentImage:string,studentName:string,age:string,level:string,fatherName:string,school:string,division:string,phoneNumber:string) => {
    setSelectedStudentId(studentId);
    setStudentName(studentName);
    setAge(age);
    setFatherName(fatherName)
    setSchool(school)
    setdivision(division)
    setPhoneNumber(phoneNumber)
    setLevel(level)
    setStudentImage(studentImage);
    setIsEditModalOpen(true);
  };
  
  const closeEditModal = () => {
    setSelectedStudentId('');
    setIsEditModalOpen(false);
  };
  

  
  useEffect(() => {
    const fetchLocations = async () => {
      try {
          const res = await fetch('/api/getLocation', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({}) // You can pass any data here if required
          });
          const data = await res.json();
          const locationsData = data.map((location: any) => ({
              locationId: location.locationId,
              locationName: location.locationName,
          }));
          setLocations(locationsData);
          router.push("/dashboard");
      } catch (error) {
          console.error('Failed to fetch locations:', error);
      }
  };
  fetchLocations();
  
  }, []);

  const handleLocationChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLocationId = e.target.value;
    setSelectedLocationId(selectedLocationId);
    try {
        const res = await fetch('/api/getStudents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ selectedLocationId }) // Send the selectedLocationId in the request body
        });
        const data: Location[] = await res.json();
        const selectedLocationStudents = data.find((location) => location.locationId === selectedLocationId)?.students.map((student) => ({
            ...student,
            fatherName: student.fatherName,
            phoneNumber: student.phoneNumber,
             division: student.division,
            level: student.level,
            Image: student.Image,
        })) || [];
        setStudents(selectedLocationStudents);
        router.push("/dashboard");
    } catch (error) {
        console.error('Failed to fetch students:', error);
    }
};

 
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>,image: string | null) => {
    e.preventDefault();
    const response = await fetch('/api/addStudent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ locationName, studentName, age, level,image,fatherName,school,division,phoneNumber }),
    });

    if (response.ok) {
      closeModal()
      router.push('/signIn');
    } else {
      // Handle error
    }
  };
  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>,Image:string) => {
    e.preventDefault();
    console.log()
    const response = await fetch('/api/editStudent', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ locationId: selectedLocationId, studentId: selectedStudentId, newName: studentName, newAge: parseInt(age),level:parseInt(level),Image:Image,fatherName:fatherName,school:school,division:division,phoneNumber:phoneNumber}),
    });
  
    if (response.ok) {
      router.push('/signIn');
      closeEditModal();
    } else {
      // Handle error
    }
  };
  
  return (
    <div>
    <div style={{ background: bgColor }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
        <div className='text-4xl text-white ' style={{ fontSize: "4rem", padding: '10px 0',marginLeft:'3rem' }}>
          Help<span style={{ color: '#101D62', fontWeight: 'bold' }}>Ed</span>
        </div>
        <div style={{ textAlign: 'center', flex: '5', marginLeft: "4rem" }}>
          {locations.length > 0 && (
            <select
              value={selectedLocationId || ''}
              onChange={handleLocationChange}
              style={{
                color: 'white',
                backgroundColor: 'transparent',
                padding: '10px',
                borderRadius: '10px',
                border: '1px solid #000',
                width:"300px",
                textAlign:"center",
                transition: '0.3s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLSelectElement;
                target.style.backgroundColor = 'rgba(0,0,0,0.8)';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLSelectElement;
                target.style.backgroundColor = 'transparent';
              }}
              onFocus={(e) => {
                const target = e.target as HTMLSelectElement;
                target.style.backgroundColor = 'rgba(0,0,0,0.8)';
              }}
              onBlur={(e) => {
                const target = e.target as HTMLSelectElement;
                target.style.backgroundColor = 'transparent';
              }}
            >
              <option value="" disabled hidden style={{ color: 'black' }}>Location</option>
              {locations.map((location) => (
                <option key={location.locationId} value={location.locationId}>
                  {location.locationName}
                </option>
              ))}
            </select>
          )}
        </div>
        <HomeButton />
        <PathwaysButton />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flex: '1', padding: '10px' }}>
          <button
            onClick={openModal}
            className='mr-14 text-white'
            style={{
              color: 'white',
              backgroundColor: 'rgba(0,0,0,0.2)',
              padding: '10px 20px',
              border: 'none',
              fontSize: "1.5rem",
              display: 'flex',
              justifyContent: 'center',
              width: '300px',
              borderRadius: '10px',
              
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.backgroundColor = 'rgba(0, 0, 0,0.6 )';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
              target.style.padding = '10px 20px';
            }}
          >
            + Add Student
          </button>
          <SignOutButton />
        </div>
      </div>


  

      <AddStudentModal
        isOpen={isOpen}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
        studentName={studentName}
        setStudentName={setStudentName}
        locationName={locationName}
        setLocationName={setLocationName}
        age={age}
        setAge={setAge}
        level={level}
        setLevel={setLevel}
        fatherName={fatherName}
        setFatherName={setFatherName}
        school={school}
        setSchool={setSchool}
        division={division}
        setDivision={setdivision}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
      />
    </div>
  

    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', marginLeft: 24, marginRight: 24,marginTop:40 }}>
  {students.map((student: { studentId: string; name: string; age: number; level: number; Image: string;fatherName:string;school:string;division:string;phoneNumber:number; }, index: number) => (
    <div key={student.studentId} className="student-card" style={{ width: '150px', height: '400px', margin: '10px', borderRadius: "5%", backgroundColor:"rgba(0,0,0,0.1)", boxShadow: "1px 1px 2px rgba(0,0,0,0.1)", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: '0 0 20%', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '0px', left: '3px', zIndex: 2, color: 'white', fontSize: '15px', fontWeight: 'bold', }}>
        {student.level}
      </div>
      <img src="/images/icons/star.svg" alt="star" style={{ position: 'absolute', top: '-40px', left: '-40px', zIndex: 1, width: "100px" }} />

      <button className="edit-button" style={{ 
        position: 'absolute', top: '10px', right: '10px', background: 'transparent', border: 'none',backgroundColor: 'rgba(0,0,0,0.2)',
        padding: '10px ',    borderRadius: '10px'
      }}
      onMouseEnter={(e) => {
        const target = e.target as HTMLButtonElement;
        target.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
      }}
      onMouseLeave={(e) => {
        const target = e.target as HTMLButtonElement;
        target.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
      }}

        onClick={() => openEditModal(student.studentId, student.Image, student.name, student.age.toString(),student.fatherName,student.school,student.division,student.phoneNumber.toString() ,student.level.toString())}
      >
        <FaEdit />
      </button>
      <div id="cont">
        <div id="box">
          <img
            src={student.Image||'/images/profile-white.svg'}
            className="border-gradient"
            alt="Placeholder"
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              objectFit: 'cover', 

            }}
          />
        </div>
      </div>
      {student.name && (
  <p>
    <span className="label" style={{ marginTop: '10px' }}>Name:</span>
    <span className="value" style={{ marginLeft: 20 }}>{student.name}</span>
  </p>
)}

{student.fatherName && (
  <p>
    <span className="label" style={{ marginTop: '10px' }}>Father&apos;s Name:</span>
    <span className="value" style={{ marginLeft: 20 }}>{student.fatherName}</span>
  </p>
)}

{student.age && (
  <p>
    <span className="label" style={{ marginTop: '10px' }}>Age:</span>
    <span className="value" style={{ marginLeft: 33 }}>{student.age}</span>
  </p>
)}

{student.phoneNumber && (
  <p>
    <span className="label" style={{ marginTop: '10px' }}>Phone Number:</span>
    <span className="value" style={{ marginLeft: 33 }}>{student.phoneNumber}</span>
  </p>
)}

{student.division && (
  <p>
    <span className="label" style={{ marginTop: '10px' }}>Class:</span>
    <span className="value" style={{ marginLeft: 33 }}>{student.division}</span>
  </p>
)}

{student.school && (
  <p>
    <span className="label" style={{ marginTop: '10px' }}>School:</span>
    <span className="value" style={{ marginLeft: 33 }}>{student.school}</span>
  </p>
)}


    </div>
  )).reduce((rows: JSX.Element[][], current: JSX.Element, index: number) => {
    const row = Math.floor(index / 4);
    rows[row] = rows[row] || [];
    rows[row].push(current);
    return rows;
  }, []).map((row, index) => <div key={index} style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>{row}</div>)}
</div>



<EditStudentModal
  isOpen={isEditModalOpen}
  closeModal={closeEditModal}
  handleSubmit={handleEditSubmit}
  studentName={studentName}
  setStudentName={setStudentName}
  age={age}
  setAge={setAge}
  level={level}
  setLevel={setLevel}
  studentImage={studentImage}
  setStudentImage={setStudentImage}
  fatherName={fatherName}
  setFatherName={setFatherName}
  school={school}
  setSchool={setSchool}
  division={division}
  setDivision={setdivision}
  phoneNumber={phoneNumber}
  setPhoneNumber={setPhoneNumber}
/>
</div>



  );
  
};

export default Page;
