import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Spinner from 'react-bootstrap/Spinner';

import { useDispatch, useSelector } from 'react-redux';
import Briefing from '../Briefing/Briefing';
import Applicant from '../Applicant/Applicant';
import FinishedAssessment from '../../presentational/FinishedAssessment/FinishedAssessment';

import { getApplication } from '../../redux/applicant';

import './Assessment.css';

function Assessment () {

  const dispatch = useDispatch();
  const application = useSelector(store => store.applicant);
  
  const [ loading, setLoading ] = useState(true);
  const [ applicantCurrentPage, setApplicantCurrentPage ] = useState(<div></div>);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getApplication(id));
  }, []);

  useEffect(() => {
    if (application.exercise) {
      if (application.status === 'issued') setApplicantCurrentPage(<Briefing/>); 
      else if (application.status === 'activated') setApplicantCurrentPage(<Applicant/>);
      else setApplicantCurrentPage(<FinishedAssessment status={application.status}/>);
      setLoading(false);
    }
  }, [application]);

  return (
    <>
      {
        loading
          ? <div className="assessment-container">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
          : applicantCurrentPage
      }
    </>
  );

}

export default Assessment;