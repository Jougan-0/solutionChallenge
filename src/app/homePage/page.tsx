"use client"
import React,{useState} from 'react';
import SignOutButton from '../../components/singout';
import HomeButton from "@/components/dashboardButton";
import PathwaysButton from '../../components/pathwayButton';

const Homepage: React.FC = () => {
  const [bgColor, setBgColor] = useState<string>('rgb(30,103,126)');

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


      <main>
        <div className="img-container">
          <div className="childrenImage">
            <img src="images\image.jpg" alt="Image Alt Text" />
          </div>
          <div className="image-text">Education is the most powerful weapon which you
            can use to change the world. - Nelson Mandela</div>
        </div>
        <div className="probcontainer">
          <img src="images/theproblem.jpg" alt="Problem Image Alt Text" />
        </div>

        <div className="solution">
          <h1>The Solution</h1>
        </div>
        <div className="sol-para">
          <p>There are a lot of NGOs and non-profitable organizations that work towards providing education to
             unprivileged children. In these organizations, people go to slums and teach children. While doing that, 
             it’s difficult for them to track the progress of the children they are teaching and teach them from the right resource. 
             HelpEd helps these organizations to track the student’s progress as well as provides a pathway along with some assignments. 
             Completion of which the students are assigned some levels.</p>
        </div>
        <div className="big-container" >
          <div className="heading">
            <h1>Our Vision</h1>
          </div>
            <div className="vision-para">
            <p>Our VIsion is to reach and support as many organizations as possible and make the process of educating 
              underprivileged children easy for them. Soon in this website will be providing a resource section from where students will 
              be able to see future career options for them according to their 
              interest. And the website then will not only benefit the organizations but directly students too</p>
            </div>
        </div>
      </main>

      <style jsx>{`
          * {
            margin: 0; 
            padding:0;
            font-family: 'Arial', sans-serif; 
          }
          .header {
            width: 100%;
            padding-bottom: 20px;
            background-color: #1E677E;
          }
          .button-container {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 40px;
          }
      
          .line {
            flex: 1;
            border-top: 4px dashed #000;
            margin: 0 10px;
          }
        .box{
            width: 100px;
            height: 100px;
            background-color: #10BCE4;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        button {
          margin-left: 1rem;
          padding: 0.5rem 1rem;
          border: none;
          border-radius:20px;
          color: #000;
        }

        .childrenImage img{
          width: 100%;
          height: 1000px;;
        }

        .image-text {
          position: absolute;
          top: 50%; 
          left: 50%; 
          transform: translate(-50%, -50%); 
          color: black; 
          font-size: 40px; 
          font-weight: bold; 
          text-align: center; 
          line-height: 1.5;
        }

        .probcontainer img{
          width: 100%;
          height: 500px;
          margin-top: 50px;
        }

        .solution{
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px;
          font-size: 70px;
          font-weight: bold;
          margin-top: 50px;
        }
        
        .sol-para{
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 30px;
          margin-left: 400px;
          margin-right: 400px;
          line-height: 1.5;
          margin-top: 50px;
          margin-bottom: 50px;
          align-text: center;
        }

        .big-container{
          background-color: rgba(30,103,126,0.7);
          height: 350px;
          margin-bottom: 50px;
        }

        .heading{
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 3rem;
          font-size: 70px;
          font-weight: bold;
        }

        .vision-para{
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 30px;
          margin-left: 400px;
          margin-right: 400px;
          line-height: 1.5;;
          align-text: center;

        }
      `}</style>
    </div>
  );
};

export default Homepage;
