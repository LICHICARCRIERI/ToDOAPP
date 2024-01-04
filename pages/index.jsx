import React, { useEffect } from "react";
import { useState } from "react";




export default function Home() {
  const [todo, setTodo] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    setTodo([...todo, inputValue]);
    setInputValue("");  };

  const handleDeleteTodo = (index) => {
    const newTodo = todo.filter((_, i) => i !== index);
    setTodo(newTodo);
  };

  
  function Reloj() {
    const [hora, setHora] = useState(new Date());
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setHora(new Date());
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, []); 
  
    const formatoHora = hora.toLocaleTimeString("es-AR", { hour: '2-digit', minute: '2-digit', hour12: false });
  

    return formatoHora
  }

  function Fecha() {
    const [fecha , setFecha] = useState(new Date());
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setFecha(new Date());
      }, 5000);
  
 
      return () => clearInterval(intervalId);
    }, []); 
 
    var options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
    const formatoFecha1 = fecha.toLocaleDateString("es-AR", options);
    const formatoFecha = formatoFecha1[0].toLocaleUpperCase() + formatoFecha1.substring(1)


    return formatoFecha
  }
  
  const [climaData, setClimaData] = useState(null);

  useEffect(() => {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=rosario&units=metric&appid=f4e7465a2ce7ac7acc2cd3319e2caed4";

    fetch(url)
      .then(res => res.json())
      .then(data => setClimaData(data))
      .catch(error => console.log(error));
  }, [600000]);

  const MostrarClima = () => {
    if (!climaData) {
      return <p>Cargando...</p>;
    }

    return (
      <div>
        
        <p>{climaData.name} {climaData.main.temp.toFixed(1)} °C</p>
      </div>
    );
  };


  <script
  type="text/javascript"
  src="../node_modules/tw-elements/dist/js/tw-elements.umd.min.js"></script>




  return (
    <div className=" flex flex-row justify-around content-center mt-8 ">
      
      <div className="toDoIZQ flex flex-col justify-center text-center w-1/3 h-[90dvh] sm:hidden md:hidden lg:flex " >
     <div className="text-8xl text-white"><Reloj /></div>
      <div className="text-2xl text-white"><Fecha /></div>
      <div className="text-2xl text-white"><MostrarClima/></div>
      </div>

      <div className='toDoDER flex flex-col w-1/3 h-[90dvh] p-5 justify-between border rounded-[28px] backdrop-blur-md backdrop-brightness-50 sm:flex sm:w-full sm:mx-10 md:flex md:auto lg:min-w-min lg:w-1/3 xl:w-1/3 lg:flex xl:flex min-w-[370px]'>
      <div>
          <h1 className="text  text-white text-3xl ">Cosas que hacer </h1>
          <h2 className="text text-white text-xl mt-2">Hoy va a ser un gran día!</h2>
      </div>
    
          <ul className=" flex flex-col gap-2 p-1  ">
            
          {todo.map((todo, index) => (
            <li key={index} className="flex p-1 items-center  justify-between border rounded-full animate-fade-up transition-all ">
              
              <p className="text text-white text-wrap text-xl px-2"> <input type="checkbox"  ></input>  {todo}</p>
             
              <img src="https://icons.iconarchive.com/icons/custom-icon-design/flatastic-1/512/delete-1-icon.png" className="w-8 cursor-pointer" onClick={() => handleDeleteTodo(index)}></img>
             
            </li>
        
          ))}
        </ul>

          <div className="flex flex-row justify-between border rounded-full backdrop-blur-md " >
          <input
            className="flex text-white placeholder:text-white focus:outline-none px-4 py-2  w-96 bg-transparent text-wrap "
            type="text"
            placeholder="Ingrese nueva tarea"
            value={inputValue}
        
            onChange={handleInputChange}
          
          />
          
          <button className="flex  bg-white px-4 py-2 m-1 rounded-full " onClick={handleAddTodo}>Agregar</button>
        </div>
        
        
      
      
      </div>
    </div>
  );
}