import { useState } from "react"

function Dropdown({selected,itemSelect,disabled=false}) {
  const [showList,setShowList] = useState(false)
  const items = [{
    value:'german',
    name:'German'
  },
  {
    value:'hindi',
    name:'Hindi'
  }]
  let selectedItem = items.find(i => i.value == selected)
  return (
  <div className="p-4">
    <button onClick={() => { if(disabled) return ; setShowList(prev => !prev)}} className="relative text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">{selectedItem ? selectedItem.name : 'Dropdown button'} 
    {!disabled && <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-width="2" d="m1 1 4 4 4-4"/>
        </svg>}
    </button>
    {showList && <div  className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
          {items.map((item)=>{
            return (
              <li key={item.value}>
                <a onClick={() => {itemSelect(item.value) ; setShowList(false)} } href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{item.name}</a>
              </li>
            )
          })}
        </ul>
    </div>}
    </div>
  )
}
export default Dropdown