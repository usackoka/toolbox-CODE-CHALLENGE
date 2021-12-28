import React from 'react';
import SectionTitle from '../../components/SectionTitles/SectionTitle';

interface Props {
  children: any;
  title?: string;
  subtitle?: string;
}

const GenericContainer = (props: Props) => {
  const { children, title, subtitle } = props;
  return (
    <div className="contact-form-section section section-padding-t90-b100 bg-primary-blue">
      <div className="container">
        <div className="row">
          <div className="offset-lg-2 col-lg-8">
            <SectionTitle headingOption="fz-32" title={title} subTitle={subtitle} />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenericContainer;
