import React from 'react';
import { Button } from 'reactstrap';

import './About.css';

const About = () => {
  return(
    <div className="About">
      <div className="About-header">
        <p className="subtitle">Blockchain Artifact Database</p>
        <p>Antiques and antiquities come to life on the blockchain.</p>
        <Button
          color="primary"
          size="lg"
          href='/register'>
          View Demo
        </Button>
        {'  '}
        <Button
          color="secondary"
          size="lg"
          href="https://github.com/BC-AD/BC-AD">
          View Code on Github</Button>
      </div>
    </div>
  )
}

export default About;
