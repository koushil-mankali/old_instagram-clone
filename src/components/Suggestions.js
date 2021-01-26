import './Suggestions.css';

import img from '../assets/koushil.jpg'


let Suggestions = () =>{
    return<>
    <div className='Suggestions'>
        <div className='sggts'><span className='sggts_ttl'>Suggestions For You</span><span className='sggts_ll'>See All</span></div>
        <div className='sggts_box'>
            {/* Repeat forEach  */}

            <div className='sggts_box2'>
                <div className='sggt_person'>
                    <div className='sggt_img'><img src={img} alt="profile"/></div>
                    <div className='sggt_det'>
                        <div className='sggt_det_nm'>name</div>
                        <div className='sggt_dets'>mutual</div>
                    </div>
                </div>
                <div className='sggt_fllw'>Follow</div>
            </div>

            {/* Copiex  */}
            <div className='sggts_box2'>
                <div className='sggt_person'>
                    <div className='sggt_img'><img src={img} alt="profile"/></div>
                    <div className='sggt_det'>
                        <div className='sggt_det_nm'>name</div>
                        <div className='sggt_dets'>mutual</div>
                    </div>
                </div>
                <div className='sggt_fllw'>Follow</div>
            </div>
            <div className='sggts_box2'>
                <div className='sggt_person'>
                    <div className='sggt_img'><img src={img} alt="profile"/></div>
                    <div className='sggt_det'>
                        <div className='sggt_det_nm'>name</div>
                        <div className='sggt_dets'>mutual</div>
                    </div>
                </div>
                <div className='sggt_fllw'>Follow</div>
            </div>
            <div className='sggts_box2'>
                <div className='sggt_person'>
                    <div className='sggt_img'><img src={img} alt="profile"/></div>
                    <div className='sggt_det'>
                        <div className='sggt_det_nm'>name</div>
                        <div className='sggt_dets'>mutual</div>
                    </div>
                </div>
                <div className='sggt_fllw'>Follow</div>
            </div>
            {/* Copiex  */}
           
        </div>
    </div>
    </>
}

export default Suggestions;
