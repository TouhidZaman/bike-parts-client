import React, { useEffect, useState } from "react";
import question from "../../../../images/question.webp";

const Blogs = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetch("questions-data.json")
            .then((res) => res.json())
            .then((data) => setQuestions(data));
    }, []);

    return (
        <div className="bg-gray-800">
            <div className="w-5/6 md:w-2/3 lg:w-11/12 mx-auto pb-8 pt-6">
                <div className="flex flex-col items-center pb-6">
                    <h3 className="text-3xl text-primary mb-3">
                        Interview Questions
                    </h3>
                    <div className="mb-2 border-b w-[120px] border-stone-300 rounded-lg"></div>
                </div>
                <div className="">
                    {questions.map((q) => (
                        <div
                            key={q.id}
                            className="mb-6 flex flex-col items-center rounded-lg border shadow-md md:flex-row border-gray-700 bg-accent"
                        >
                            <img
                                className="p-4 object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                                src={question}
                                alt="Item-img"
                            />
                            <div className="flex flex-col justify-between p-4 leading-normal text-neutral-content">
                                <h5 className="mb-2 text-center md:text-left text-2xl font-bold tracking-tight">
                                    {q.question}
                                </h5>
                                <p className="mb-2 text-justify md:text-left  font-normal">
                                    {q.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blogs;
