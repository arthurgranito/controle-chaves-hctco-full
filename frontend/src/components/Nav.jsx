import logo from '../img/HCTCO Logo.png';

const Nav = () => {
  return (
    <nav className='p-4 py-5 border-b flex items-center justify-between px-10 w-[100vw]'>
        <h1 className='font-bold text-2xl text-[#03685d]'>Controle de Chaves</h1>
        <img src={logo} alt="Logo HCTCO" className='w-28'/>
    </nav>
  )
}

export default Nav