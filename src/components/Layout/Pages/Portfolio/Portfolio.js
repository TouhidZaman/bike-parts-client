import React from "react";
import touhid from "../../../../images/touhid.png";
import { BiCodeAlt } from "react-icons/bi";
import { MdSchool, MdAttachEmail } from "react-icons/md";
import { FaUniversity, FaGithub } from "react-icons/fa";

const Portfolio = () => {
    const frontendSkills = [
        "HTML",
        "CSS",
        "SCSS",
        "Tailwind-CSS",
        "DaisyUI",
        "Bootstrap",
        "JavaScript",
        "ReactJS",
        "React-query",
    ];
    const backendSkills = [
        "NodeJs",
        "ExpressJS",
        "Rest-API",
        "MongoDB",
        "Familiar with Laravel",
        "Familiar with MySql",
    ];
    const tools = [
        "VS Code",
        "Chrome Dev Toll",
        "GitHub",
        "Figma",
        "Firebase",
        "Heroku",
    ];
    return (
        <div className="bg-gray-800">
            <div className="w-5/6 md:w-2/3 lg:w-11/12 mx-auto pb-8 pt-6">
                <div className="flex flex-col items-center pb-6">
                    <h3 className="text-3xl text-primary mb-3">
                        Welcome to My Portfolio
                    </h3>
                    <div className="mb-2 border-b w-[120px] border-stone-300 rounded-lg"></div>
                </div>
                <div className="card lg:card-side bg-accent text-neutral-content mb-6">
                    <figure>
                        <img className="pt-4 lg:pt-0" src={touhid} alt="Movie" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title text-3xl">
                            Hi! I'm Muhammad Touhiduzzaman
                        </h2>
                        <p className="text-xl flex items-center">
                            <BiCodeAlt className="mr-2" />
                            I'm a MERN Stack Web Developer
                        </p>
                        <p className="text-xl flex items-center">
                            <MdSchool className="mr-2" />
                            Education: I have completed B.Sc in Computer Science and
                            Engineering (CSE).
                        </p>
                        <p className="text-xl flex items-center">
                            <FaUniversity className="mr-2" />
                            Institute: Daffodil international University
                        </p>
                        <p className="text-xl flex items-center">
                            <MdAttachEmail className="mr-2" />
                            Email: touhid4bd@gmail.com
                        </p>
                        <p className="text-xl flex items-center">
                            <FaGithub className="mr-2" />
                            Github:
                            <a
                                href="https://github.com/TouhidZaman"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link link-hover ml-2"
                            >
                                Visit my github profile
                            </a>
                        </p>
                    </div>
                </div>
                <h3 className="text-3xl my-8 text-neutral-content text-center">
                    My Skills / List of technologies I'm used with
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="card max-w-lg bg-accent text-neutral-content  shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-primary">
                                Frontend Technologies
                            </h2>
                            <div className="card-actions">
                                {frontendSkills.map((fs, index) => (
                                    <div key={index} className="badge badge-outline">
                                        {fs}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="card max-w-lg bg-accent text-neutral-content  shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-primary">
                                Backend Technologies
                            </h2>
                            <div className="card-actions">
                                {backendSkills.map((fs, index) => (
                                    <div key={index} className="badge badge-outline">
                                        {fs}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="card max-w-lg bg-accent text-neutral-content  shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-primary">
                                Tools I'm expert with
                            </h2>
                            <div className="card-actions">
                                {tools.map((fs, index) => (
                                    <div key={index} className="badge badge-outline">
                                        {fs}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Projects section  */}
                <h3 className="text-3xl my-8 text-neutral-content text-center">
                    Some of my recent projects
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="card max-w-lg bg-accent text-neutral-content  shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-primary">
                                Grocery Stock
                                <a
                                    href="https://nt-grocery-stock.web.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="badge badge-secondary"
                                >
                                    Live Website
                                </a>
                            </h2>
                            <p>
                                NT Grocery stock is a full-stack grocery inventory/
                                warehouse management website like ERP to keep track
                                and manage of your inventory items.
                            </p>
                            <h2 className="card-title text-lg">
                                Technologies used in this project
                            </h2>
                            <div className="card-actions">
                                <div className="badge badge-outline">React</div>
                                <div className="badge badge-outline">Express</div>
                                <div className="badge badge-outline">MongoDB</div>
                            </div>
                        </div>
                    </div>
                    <div className="card max-w-lg bg-accent text-neutral-content  shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-primary">
                                Health coach
                                <a
                                    href="https://health-coach-by-touhid.web.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="badge badge-secondary"
                                >
                                    Live Website
                                </a>
                            </h2>
                            <p>
                                This is a frontend project for independent service
                                providers who provide gym services and any user can
                                find and book their desired services here.
                            </p>
                            <h2 className="card-title text-lg">
                                Technologies used in this project
                            </h2>
                            <div className="card-actions">
                                <div className="badge badge-outline">React</div>
                                <div className="badge badge-outline">
                                    Firebase Authentication
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card max-w-lg bg-accent text-neutral-content  shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-primary">
                                Todo App
                                <a
                                    href="https://my-todos-list.web.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="badge badge-secondary"
                                >
                                    Live Website
                                </a>
                            </h2>
                            <p>
                                This is a full-stack website to keep track and store
                                a person's daily tasks. This app helps user to
                                remember daily task to improve productivity
                            </p>
                            <h2 className="card-title text-lg">
                                Technologies used in this project
                            </h2>
                            <div className="card-actions">
                                <div className="badge badge-outline">React</div>
                                <div className="badge badge-outline">Express</div>
                                <div className="badge badge-outline">MongoDB</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
