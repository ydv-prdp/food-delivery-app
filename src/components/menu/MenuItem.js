export default function MenuItem(){
    return (
        <div className="bg-gray-400 p-4 rounded-lg text-center group hover:bg-white hover:shadow-md hover:shadow-black/25">
            <img src="/pizza.png" alt="pizza"/>
            <h4 className="font-semibold my-4">Pepperoni Pizza</h4>
            <p className="text-gray-500 text-sm">lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem </p>
            <button className=" mt-4 bg-primary text-white rounded-full px-4 py-2">Add to cart $12</button>
        </div>
    )
}