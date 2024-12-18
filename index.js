

const loadAllPhone=async(status,searchText)=>{
 
  document.getElementById('spinner-btn').classList.remove("hidden");
  //  document.getElementById('spinner').style.display='none'
  
const res=await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText?searchText:"iphone"}`)
const data=await res.json()
if(status){
displayAllPhone(data.data)}
else{displayAllPhone(data.data.slice(0,6))}
document.getElementById('spinner-btn').classList.add("hidden");
  }


const displayAllPhone=(phones)=>{
const phoneContainer=document.getElementById("phones-container")
phoneContainer.innerHTML= ' ';
 if (phones.length === 0) {
      phoneContainer.innerHTML = `<h2 class="text-center text-xl text-red-500 mt-5">No Phones Found</h2>`
      return
    }
phones.forEach(phone => {
    const {brand,slug,image}=phone
const div= document.createElement("div")
div.innerHTML=
`
<div class="card bg-base-100 w-96 shadow-xl">
<h1>${slug}</h1>
  <figure class="px-10 pt-10">
<img
      src="${image}"
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${brand}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions">
      <button class="btn btn-primary" onClick="phoneDetails('${slug}')">Details</button>
    </div>
  </div>
</div>
`
phoneContainer.appendChild(div)
});

}

// show details start
const phoneDetails =  async(slugs) => {

  const res= await fetch(`https://openapi.programming-hero.com/api/phone/${slugs}`)
  const data = await res.json()
  console.log(data.data);
  const {brand,image,slug}= data.data
  const modalContainer=document.getElementById('modal-container')
  modalContainer.innerHTML=
  `


<dialog id="my_modal_1" class="modal">
  <div class="modal-box">
    <h3 class="text-lg font-bold">${brand}</h3>
<h1>${slug}</h1>
  <figure class="px-10 pt-10">
<img
      src="${image}"
      alt="Shoes"
      class="rounded-xl" />
  </figure>

    <p class="py-4">Press ESC key or click the button below to close</p>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
  `
  my_modal_1.showModal()
}

// show details end




const handleShowAll=()=>{  
  const searchText = document.getElementById("search-box").value.trim()
  loadAllPhone(true, searchText)

}

const handleSearch=()=>{
 
const searchText = document.getElementById("search-box").value.trim()
if (!searchText) {
  alert("Please enter a phone name to search.")
  return
}

document.getElementById('spinner-btn').classList.remove("hidden")
//  loadAllPhone(false, searchText)

    setTimeout(()=>{
        loadAllPhone(false,searchText)
        
    },3000)
}
loadAllPhone(false)