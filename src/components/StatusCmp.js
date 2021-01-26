import "./StatusCmp.css";
import status from '../assets/koushil.jpg'


function StatusCmp() {
  return (
    <>
      <div className="StatusCmp">
        <span className="arrows">
          <div className='statusCircle'><img src={status} alt="status" className='statusImage'/><div className='statusNme'>koushil</div></div>
          <div className='statusCircle'><img src={status} alt="status" className='statusImage'/><div className='statusNme'>koushil</div></div>
          <div className='statusCircle'><img src={status} alt="status" className='statusImage'/><div className='statusNme'>koushil</div></div>
          <div className='statusCircle'><img src={status} alt="status" className='statusImage'/><div className='statusNme'>koushil</div></div>
          <div className='statusCircle'><img src={status} alt="status" className='statusImage'/><div className='statusNme'>koushil</div></div>
          <div className='statusCircle'><img src={status} alt="status" className='statusImage'/><div className='statusNme'>koushil</div></div>
          <div className='statusCircle'><img src={status} alt="status" className='statusImage'/><div className='statusNme'>koushil</div></div>
          <div className='statusCircle'><img src={status} alt="status" className='statusImage'/><div className='statusNme'>koushil</div></div>
        </span>
      </div>
    </>
  );
}

export default StatusCmp;
