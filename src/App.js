import React,{useState} from 'react'
import './App.css'
const App = () => {
  const[search,setsearch]=useState("");
  const[data,setdata]=useState([]);
  const submitHandler=e=>
  {
    e.preventDefault();
    fetch(`https://www.omdbapi.com/?s=${search}&apikey=c78c8143`).then(
      response=>response.json()
    ).then(value=>setdata(value.Search))

  }
  const download=url=>
  {
    fetch(url).then(response=>{
      response.arrayBuffer().then(function(buffer){
      const url=window.URL.createObjectURL(new Blob([buffer]));
      const link=document.createElement("a");
      link.href=url;
      link.setAttribute("download","image.png");
      document.body.appendChild(link);
      link.click();
    })
  })
  .catch(err=>{
    console.log(err);
  });
  };
  return (
    <div ><center>
    <div class="div">  <h1 class="h">
        search a webseries
      </h1><br/>
      <form onSubmit={submitHandler}>
        <input type="text" value={search} onChange={(e)=>setsearch(e.target.value)} class="in" placeholder='search here'></input><br/><br/>
        <input class="button"type="submit" value="search"/>
        </form></div>
       <hr/> <marquee><img src="https://i.ytimg.com/vi/kyuzY-gPQWM/maxresdefault.jpg " width="1000px" height="240px"></img></marquee><hr/>
        <div class="row">
        {data.map((items)=><div class="col-md-3 m2"><div class="card" style={{width:200}}>
  <img class="card-img-top" src={items.Poster} alt="Card image"/>
  <div class="card-body">
    <b class="card-text">{items.Title}</b><br/>
    <a className="btn btn-primary" onClick={()=>download(items.Poster)}>Download poster</a>
  </div>
</div><br/><br/></div>
)}
</div></center>
    </div>
  )
}

export default App