import React, {useState} from "react";
import CommentComponent from "@frontend/src/components/reviews/CommentComponent";
import ProfileComponent from "@frontend/src/components/reviews/ProfileComponent";

const CardComponent = () => {
    const [activetab, setActiveTab] = useState('profile');

return(
    <div>

        <span className="tab tab-bordered" onClick = {()=>  setActiveTab('profile')}>Профиль </span>
        <span className="tab tab-bordered" onClick={() => setActiveTab('document')}>Документы</span>
        <span className="tab tab-bordered" onClick={() => setActiveTab('reviews')}>Отзывы</span>

        {activetab ==='profile' && <ProfileComponent/>}
        {activetab ==='document' && <p>Document</p>}
        {activetab ==='reviews'
            &&
            <CommentComponent/>
        }
    </div>
)
}

export default CardComponent;