import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Work.scss';

const WorkItem = ({ work }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [hoverStatus, setHoverStatus] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const activateHover = () => {
    setHoverStatus(true);
  };

  const deactivateHover = () => {
    setHoverStatus(false);
  };


  const handleClick = () => {
    if (!showDetails) {
      toggleDetails();
      activateHover();
    } else {
      deactivateHover();
      toggleDetails();
    }
  };

  const handleLinkClick = (e) => {
    e.stopPropagation(); // Hentikan peristiwa klik dari menyebar ke elemen induk
  };  

  useEffect(() => {
    if (!showDetails) {
      setShowDetails(false); // Reset showDetails state when item is no longer clicked
    }
  }, [showDetails]);

  return (
    <div className={`app__work-item app__flex ${showDetails ? 'is-clicked' : ''}`} onClick={handleClick}>
      <div className="app__work-img app__flex">
        <img src={urlFor(work.imgUrl)} alt={work.name} />

        <motion.div
          whileHover={{ opacity: [0, 1] }}
          transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
          className={`app__work-hover app__flex ${hoverStatus ? 'is-clicked' : ''}`}
          onClick={handleLinkClick}
        >
          <a href={work.projectLink} target="_blank" rel="noreferrer">
            <motion.div
              whileInView={{ scale: [0, 1] }}
              whileHover={{ scale: [1, 0.90] }}
              transition={{ duration: 0.25 }}
              className="app__flex"
              onClick={activateHover}
            >
              <AiFillEye />
            </motion.div>
          </a>
          <a href={work.codeLink} target="_blank" rel="noreferrer">
            <motion.div
              whileInView={{ scale: [0, 1] }}
              whileHover={{ scale: [1, 0.90] }}
              transition={{ duration: 0.25 }}
              className="app__flex"
              onClick={activateHover}
            >
              <AiFillGithub />
            </motion.div>
          </a>
        </motion.div>
      </div>

      <div className="app__work-content app__flex">
        <h4 className="bold-text">{work.title}</h4>
        <p className="p-text" style={{ marginTop: 10 }}>
          {work.description}
        </p>

        <div className="app__work-tag app__flex">
        {work.tags.map((tag, tagIndex) => (
          <p key={tagIndex} className="p-text">
            {tag}
          </p>
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
