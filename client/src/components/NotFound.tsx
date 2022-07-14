import React from 'react'
import { Image } from 'react-bootstrap';

function NotFound() {
  return (
    <div className="position-absolute top-50 start-50 translate-middle fs-1 fw-bold text-center">
      <Image rounded src="/images/hit_the_breaks.png" alt="site logo" />

      <div className='mt-5'> 404 page not found</div>
    </div>
  );
}

export default NotFound