import React, {useEffect,useState} from 'react';
import axios from 'axios';
import Nav from '../Nav copy/Nav'
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';


function UpdateDelivery  () {

    const [inputs, setInputs] = useState({});
    const history = useNavigate();
    const id = useParams().id;

    useEffect(()=>{
        const fetchHandler = async ()=>{
            await axios
            .get(`http://localhost:5000/delivery/${id}`)
            .then((res)=> res.data)
            .then((data)=> setInputs(data.delivery));
        };
        fetchHandler();
    },[id]);

    const sendRequest = async ()=>{
        await axios.put(`http://localhost:5000/delivery/${id}`,{
            
            packageId:String (inputs.packageId),
            email:String (inputs.email),
            address:String (inputs.address),
            packSize:String (inputs.packSize),
            weight:String (inputs.weight),
            delman:String (inputs.delman),
            delservice:String (inputs.delservice),
          
        })
        .then((res)=> res.data);
    };

    const [packageSizeError, setPackageSizeError] = useState('');
    const [weightError, setWeightError] = useState('');

    const handlechange = (e) => {
        const { name, value } = e.target;
        setInputs((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        if (name === 'weight') {
            if (!/^\d+(\.\d+)?$/.test(value) || parseFloat(value) <= 0) {
                setWeightError('Please enter a valid weight (greater than 0)');
            } else {
                setWeightError('');
            }
        }
        if (name === 'packSize') {
            if (!/^\d+(\.\d+)?\*\d+(\.\d+)?\*\d+(\.\d+)?$/.test(value)) {
                setPackageSizeError('Please enter a valid package size pattern (e.g., 2.0*0.5*1.0)');
            } else {
                setPackageSizeError('');
            }
        }
    };

    const handlesubmit = async (e)=>{
        e.preventDefault();

        console.log(inputs);
        if (!weightError && !packageSizeError) {
            await sendRequest();
            history('/deliverydetails');
        }
        
        
    };
    return (
    <div>
        <Nav/>
        <h1 className="text-3xl font-bold mb-4">Update Delivery Details</h1>
            <form onSubmit={handlesubmit} className="space-y-4">
            <div className="flex flex-col">
                    <label className="mb-1">Package ID</label>
                    <input type="text" name="packageId" onChange={handlechange} value={inputs.packageId} required className="border border-gray-300 rounded-md px-3 py-2" />
                </div>
                <div className="flex flex-col">
                    <label className="mb-1">Email</label>
                    <input type="email" name="email" onChange={handlechange} value={inputs.email} required className="border border-gray-300 rounded-md px-3 py-2" />
                </div>
                <div className="flex flex-col">
                    <label className="mb-1">Address</label>
                    <input type="text" name="address" onChange={handlechange} value={inputs.address} required className="border border-gray-300 rounded-md px-3 py-2" />
                </div>
                <div className="flex flex-col">
                    <label className="mb-1">Pack Size</label>
                    <input type="text" name="packSize" onChange={handlechange} value={inputs.packSize} required className={`border border-gray-300 rounded-md px-3 py-2 ${packageSizeError ? 'border-red-500' : ''}`} />
                    {packageSizeError && <p className="text-red-500 text-xs mt-1">{packageSizeError}</p>}
                </div>
                <div className="flex flex-col">
                    <label className="mb-1">Weight</label>
                    <input type="text" name="weight" onChange={handlechange} value={inputs.weight} required className={`border border-gray-300 rounded-md px-3 py-2 ${weightError ? 'border-red-500' : ''}`} />
                    {weightError && <p className="text-red-500 text-xs mt-1">{weightError}</p>}
                </div>
                <div className="flex flex-col">
                    <label className="mb-1">Delivery Man</label>
                    <input type="text" name="delman" onChange={handlechange} value={inputs.delman} required className="border border-gray-300 rounded-md px-3 py-2" />
                </div>
                <div className="flex flex-col">
                    <label className="mb-1">Delivery Service</label>
                    <input type="text" name="delservice" onChange={handlechange} value={inputs.delservice} required className="border border-gray-300 rounded-md px-3 py-2" />
                </div>
                
                
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
            </form>
    </div>
    )
}


export default UpdateDelivery

  
