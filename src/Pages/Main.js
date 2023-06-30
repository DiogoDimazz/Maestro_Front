import './styles.css';
import { Header } from '../Components/Header/Header'
import { LeftContainer } from '../Components/LeftContainer/LeftContainer';

function Main() {
  return (
    <main className='main'>
      <Header/>
      <LeftContainer/>
      {/* <RightContainer/> */}
    </main>
  );
}

export default Main;
