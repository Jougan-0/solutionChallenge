"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import SignOutButton from '../../components/singout';
import HomeButton from '@/components/homeButton';
import PathwaysButton from '../../components/dashboardButton';
import data from '@/components/data.json';

interface TopicData {
  [key: string]: { topics: string[] };
}

const Modal: React.FC<{ isVisible: boolean, level: number, topic1: string, topic2: string, topic3: string }> = ({ isVisible, level, topic1, topic2, topic3 }) => {
  console.log(topic1,level)
  return (
    <div style={{
      display: isVisible ? 'block' : 'none',
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(30,103,126, 1)',
      color: '#fff',
      padding: '20px',
      borderRadius: '15px',
      width: '700px',
      height: '500px'
    }}>
      <h2 className='text-center font-bold '>Level {level}</h2>
      <div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center", marginTop:"1rem",marginBottom:"0.5rem"}}><label htmlFor="topic1" >Topic 1:</label></div>
  
  <div className='text-center' id="topic1" style={{ color: 'black', backgroundColor: 'white', padding: '0.5rem', marginBottom: '1rem' }}>{topic1}</div>
</div>
<div>
<div style={{display:"flex",alignItems:"center",justifyContent:"center ",marginTop:"1rem",marginBottom:"0.5rem"}}><label htmlFor="topic1" >Topic 2:</label></div>
  <div id="topic2" className='text-center' style={{ color: 'black', backgroundColor: 'white', padding: '0.5rem', marginBottom: '1rem' }}>{topic2}</div>
</div>
<div>
<div style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"1rem",marginBottom:"0.5rem"}}><label htmlFor="topic1" >Topic 3:</label></div>
  <div id="topic3"  className='text-center' style={{ color: 'black', backgroundColor: 'white', padding: '0.5rem', marginBottom: '1rem' }}>{topic3}</div>
</div>

    </div>
  );
};


const Dashboard: React.FC = () => {
  const [bgColor, setBgColor] = useState<string>('rgb(30,103,126)');
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);
  const [modalLevel, setModalLevel] = useState<number>(0);
  const [modalTopic1, setModalTopic1] = useState<string>('');
  const [modalTopic2, setModalTopic2] = useState<string>('');
  const [modalTopic3, setModalTopic3] = useState<string>('');
  const handleMouseEnter = (buttonNumber: number) => {
    setHoveredButton(buttonNumber);
    const buttonKey = buttonNumber.toString() as keyof typeof data;
    const { topics } = data[buttonKey];
    setModalLevel(buttonNumber);
   
    setModalTopic1(topics[0]);
    setModalTopic2(topics[1]);
    setModalTopic3(topics[2]);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
    setModalLevel(0);
    setModalTopic1('');
    setModalTopic2('');
    setModalTopic3('');
  };

  return (
    <div>
    <div className="header" style={{padding:"1.25rem", background: bgColor }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className='text-white' style={{ display: 'flex', alignItems: 'center', fontSize: "4rem", marginLeft: '2rem', padding: '10px ' }}>
          Help<span style={{ color: '#101D62', fontWeight: 'bold' }}>Ed</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ padding: '0 10px' }}>
            <HomeButton />
          </div>
          <div style={{ padding: '0 10px' }}>
            <PathwaysButton />
          </div>
          <div style={{ marginRight: "2rem", padding: '0 10px' }}>
            <SignOutButton />
          </div>
        </div>
      </div>
   
  
  </div>
      <main style={{ display: 'flex', justifyContent: 'space-around', marginTop: '4rem' }}>

      <div className="button-column" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '200px' }}>
  <div style={{ width: '300px', height: '100px', position: 'relative', marginBottom: '20px' }}>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', padding: '8px 12px', backgroundColor: hoveredButton === 1 ? '#008394' : '#BCBCBC', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '2rem', color: '#000', fontWeight: 'medium', textAlign: 'center' }} onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={handleMouseLeave}>
      Level 1
    </div>
  </div>

  <div style={{ width: '300px', height: '100px', padding: '8px 12px', marginBottom: '20px', backgroundColor: hoveredButton === 4 ? '#008394' : '#BCBCBC', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '2rem', color: '#000', fontWeight: 'medium', textAlign: 'center', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onMouseEnter={() => handleMouseEnter(4)} onMouseLeave={handleMouseLeave}>
    Level  4
  </div>
  <div style={{ width: '300px', height: '100px', padding: '8px 12px', marginBottom: '20px', backgroundColor: hoveredButton === 7 ? '#008394' : '#BCBCBC', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '2rem', color: '#000', fontWeight: 'medium', textAlign: 'center', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onMouseEnter={() => handleMouseEnter(7)} onMouseLeave={handleMouseLeave}>
    Level 7
  </div>
  <div style={{ width: '300px', height: '100px', padding: '8px 12px', marginBottom: '20px', backgroundColor: hoveredButton === 10 ? '#008394' : '#BCBCBC', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '2rem', color: '#000', fontWeight: 'medium', textAlign: 'center', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onMouseEnter={() => handleMouseEnter(10)} onMouseLeave={handleMouseLeave}>
    Level 10
  </div>
  <div style={{ width: '300px', height: '100px', padding: '8px 12px', marginBottom: '20px', backgroundColor: hoveredButton === 13 ? '#008394' : '#BCBCBC', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '2rem', color: '#000', fontWeight: 'medium', textAlign: 'center', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onMouseEnter={() => handleMouseEnter(13)} onMouseLeave={handleMouseLeave}>
    Level 13
  </div>
  <div style={{ width: '300px', height: '100px', padding: '8px 12px', marginBottom: '20px', backgroundColor: hoveredButton === 16 ? '#008394' : '#BCBCBC', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '2rem', color: '#000', fontWeight: 'medium', textAlign: 'center', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onMouseEnter={() => handleMouseEnter(16)} onMouseLeave={handleMouseLeave}>
    Level 16
  </div>
</div>

<div className="button-column" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
  <div style={{ width: '300px', height: '100px', padding: '8px 12px', marginBottom: '20px', backgroundColor: hoveredButton === 2 ? '#008394' : '#BCBCBC', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '2rem', color: '#000', fontWeight: 'medium', textAlign: 'center', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={handleMouseLeave}>
    Level 2
  </div>
  <div style={{ width: '300px', height: '100px', padding: '8px 12px', marginBottom: '20px', backgroundColor: hoveredButton === 5 ? '#008394' : '#BCBCBC', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '2rem', color: '#000', fontWeight: 'medium', textAlign: 'center', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onMouseEnter={() => handleMouseEnter(5)} onMouseLeave={handleMouseLeave}>
    Level 5
  </div>
  <div style={{ width: '300px', height: '100px', padding: '8px 12px', marginBottom: '20px', backgroundColor: hoveredButton === 8 ? '#008394' : '#BCBCBC', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '2rem', color: '#000', fontWeight: 'medium', textAlign: 'center', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onMouseEnter={() => handleMouseEnter(8)} onMouseLeave={handleMouseLeave}>
    Level 8
  </div>
  <div style={{ width: '300px', height: '100px', padding: '8px 12px', marginBottom: '20px', backgroundColor: hoveredButton === 11 ? '#008394' : '#BCBCBC', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '2rem', color: '#000', fontWeight: 'medium', textAlign: 'center', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onMouseEnter={() => handleMouseEnter(11)} onMouseLeave={handleMouseLeave}>
    Level 11
  </div>
  <div style={{ width: '300px', height: '100px', padding: '8px 12px', marginBottom: '20px', backgroundColor: hoveredButton === 14 ? '#008394' : '#BCBCBC', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '2rem', color: '#000', fontWeight: 'medium', textAlign: 'center', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onMouseEnter={() => handleMouseEnter(14)} onMouseLeave={handleMouseLeave}>
    Level 14
  </div>
  <div style={{ width: '300px', height: '100px', padding: '8px 12px', marginBottom: '20px', backgroundColor: hoveredButton === 17 ? '#008394' : '#BCBCBC', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '2rem', color: '#000', fontWeight: 'medium', textAlign: 'center', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onMouseEnter={() => handleMouseEnter(17)} onMouseLeave={handleMouseLeave}>
    Level 17
  </div>
</div>

<div className="button-column" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
  <div style={{ width: '300px', height: '100px', padding: '8px 12px', marginBottom: '20px', backgroundColor: hoveredButton === 3 ? '#008394' : '#BCBCBC', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '2rem', color: '#000', fontWeight: 'medium', textAlign: 'center', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onMouseEnter={() => handleMouseEnter(3)} onMouseLeave={handleMouseLeave}>
    Level 3
  </div>
  <div style={{ width: '300px', height: '100px', padding: '8px 12px', marginBottom: '20px', backgroundColor: hoveredButton === 6 ? '#008394' : '#BCBCBC', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '2rem', color: '#000', fontWeight: 'medium', textAlign: 'center', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onMouseEnter={() => handleMouseEnter(6)} onMouseLeave={handleMouseLeave}>
    Level 6
  </div>
  <div style={{ width: '300px', height: '100px', padding: '8px 12px', marginBottom: '20px', backgroundColor: hoveredButton === 9 ? '#008394' : '#BCBCBC', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '2rem', color: '#000', fontWeight: 'medium', textAlign: 'center', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onMouseEnter={() => handleMouseEnter(9)} onMouseLeave={handleMouseLeave}>
    Level 9
  </div>
  <div style={{ width: '300px', height: '100px', padding: '8px 12px', marginBottom: '20px', backgroundColor: hoveredButton === 12 ? '#008394' : '#BCBCBC', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '2rem', color: '#000', fontWeight: 'medium', textAlign: 'center', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onMouseEnter={() => handleMouseEnter(12)} onMouseLeave={handleMouseLeave}>
    Level 12
  </div>
  <div style={{ width: '300px', height: '100px', padding: '8px 12px', marginBottom: '20px', backgroundColor: hoveredButton === 15 ? '#008394' : '#BCBCBC', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '2rem', color: '#000', fontWeight: 'medium', textAlign: 'center', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onMouseEnter={() => handleMouseEnter(15)} onMouseLeave={handleMouseLeave}>
    Level 15
  </div>
  <div style={{ width: '300px', height: '100px', padding: '8px 12px', marginBottom: '20px', backgroundColor: hoveredButton === 18 ? '#008394' : '#BCBCBC', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '2rem', color: '#000', fontWeight: 'medium', textAlign: 'center', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onMouseEnter={() => handleMouseEnter(18)} onMouseLeave={handleMouseLeave}>
    Level 18
  </div>
</div>

        {/* Other button columns */}
      </main>
      <Modal isVisible={hoveredButton !== null} level={modalLevel} topic1={modalTopic1} topic2={modalTopic2} topic3={modalTopic3} />

    </div>
  );
};

export default Dashboard;
