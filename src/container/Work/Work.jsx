import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Work.scss';

const WorkItem = ({ work }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDetails = () => {
    if (isMobile) {
      setShowDetails(!showDetails);
    }
  };

  return (
    <div
      className={`app__work-item app__flex ${showDetails ? 'is-clicked' : ''}`}
      onClick={toggleDetails}
    >
      <div className="app__work-img app__flex">
        <img src={urlFor(work.imgUrl)} alt={work.name} />

        {/* Hover hanya muncul di desktop */}
        {!isMobile && (
          <motion.div
            whileHover={{ opacity: [0, 1] }}
            transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
            className="app__work-hover app__flex"
          >
            <a href={work.projectLink} target="_blank" rel="noreferrer">
              <motion.div
                whileInView={{ scale: [0, 1] }}
                whileHover={{ scale: [1, 0.9] }}
                transition={{ duration: 0.25 }}
                className="app__flex"
              >
                <AiFillEye />
              </motion.div>
            </a>
            <a href={work.codeLink} target="_blank" rel="noreferrer">
              <motion.div
                whileInView={{ scale: [0, 1] }}
                whileHover={{ scale: [1, 0.9] }}
                transition={{ duration: 0.25 }}
                className="app__flex"
              >
                <AiFillGithub />
              </motion.div>
            </a>
          </motion.div>
        )}

        {/* Hover muncul saat diklik di mobile */}
        {isMobile && showDetails && (
          <div className="app__work-hover app__flex">
            <a href={work.projectLink} target="_blank" rel="noreferrer">
              <div className="app__flex">
                <AiFillEye />
              </div>
            </a>
            <a href={work.codeLink} target="_blank" rel="noreferrer">
              <div className="app__flex">
                <AiFillGithub />
              </div>
            </a>
          </div>
        )}
      </div>

      <div className="app__work-content app__flex">
        <h4 className="bold-text">{work.title}</h4>
        <p className="p-text" style={{ marginTop: 10 }}>{work.description}</p>
        <div className="app__work-tag app__flex">
          {work.tags.map((tag, index) => (
            <p key={index} className="p-text">{tag}</p>
          ))}
        </div>
      </div>
    </div>
  );
};


const Work = () => {
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [animateCard, setanimateCard] = useState({ y: 0, opacity: 1 });
  const [hoverStatus, setHoverStatus] = useState(false);

  useEffect(() => {
    const query = '*[_type == "works"]';

    client.fetch(query).then((data) => {
      setWorks(data);
      setFilterWork(data);
    });
  }, []);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setanimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setanimateCard([{ y: 0, opacity: 1 }]);

      if (item === 'All') {
        setFilterWork(works);
      } else {
        setFilterWork(works.filter((work) => work.tags.includes(item)));
      }
    }, 500);
  };

  return (
    <>
      <h2 className="head-text">
        My <span>Creative</span> Portofolio
      </h2>

      <div className="app__work-filter">
        {['Web App', 'Mobile App', 'Games', 'All'].map((item, index) => (
          <div
            key={index}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item app_flex p-text ${
              activeFilter === item ? 'item-active' : ''
            }`}
          >
            {item}
          </div>
        ))}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portofolio"
      >
        {filterWork.map((work, index) => {
          const toggleHoverStatus = () => {
            setHoverStatus(!hoverStatus);
          };
        
          return (
            <WorkItem key={index} work={work} hoverStatus={hoverStatus} toggleHoverStatus={toggleHoverStatus} />
          );
        })}

      </motion.div>
    </>
  );
};

export default AppWrap(MotionWrap(Work, 'app__works'), 'work', 'app__primarybg');
