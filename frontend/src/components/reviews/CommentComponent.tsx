
import React, { useState } from "react";

const CommentComponent = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    const addComment = () => {
        if (newComment.trim() === "") return;
        setComments([...comments, newComment]);
        setNewComment(""); // Очистка поля ввода
    };

const handleKeyDown = (e) => {
  if (e.key === 'Enter'){
      addComment()
  }
}

    return (
        <div>
            <h2 className='card-title'>Отзывы и комментарии</h2>
            <div>
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Введите комментарий"
                    className="block mt-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    
                />
                <button onClick={addComment} className="btn mt-2 btn-sm">Добавить комментарий</button>
            </div>
            <div>
                <ul>
                    {comments.map((comment, index) => (
                        <li className="text-2xl" key={index}>{comment}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CommentComponent;
