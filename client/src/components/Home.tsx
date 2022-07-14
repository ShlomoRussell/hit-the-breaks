import { Image } from "react-bootstrap";


function Home() {
  
  return  (
    <div className="text-center">
      <h1 className="fw-bold fs-1 m-5">Welcome to Hit the Breaks</h1>
      <Image src="/images/hit_the_breaks.png" rounded alt="site logo" />
    </div>
  );
}

export default Home;
