import React, {useState} from "react";
import CommentComponent from "@frontend/src/components/reviews/CommentComponent";

const CardComponent = () => {
    const [activetab, setActiveTab] = useState('profile');

return(
    <div>

        <span className="tab tab-bordered" onClick = {()=>  setActiveTab('profile')}>Профиль </span>
        <span className="tab tab-bordered" onClick={() => setActiveTab('document')}>Документы</span>
        <span className="tab tab-bordered" onClick={() => setActiveTab('reviews')}>Отзывы</span>

        {activetab ==='profile' && <p>Profil</p>}
        {activetab ==='document' && <p>Document</p>}
        {activetab ==='reviews' && <CommentComponent client:visible/>}
    </div>
)
}

export default CardComponent;