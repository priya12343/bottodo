import SearchIcon from '@mui/icons-material/Search';
import { Button, Dialog, InputAdornment, MenuItem,  TextField } from "@mui/material";
import { useEffect, useState} from 'react';
import Nav from 'react-bootstrap/Nav';
import CloseIcon from '@mui/icons-material/Close';
import {  LoadScript } from '@react-google-maps/api';
import axios from 'axios';
import {
    GoogleMap,
    Marker
  } from '@react-google-maps/api'
import images from '../assets/images/images.png'
  
  const mapStyles = {        
    height: "100vh",
    width: "100%"
};

var image = {
    Icon: images
};
  const defaultCenter = {
    lat: 41.3851, lng: 2.1734
  }
  const center = { lat: 48.8584, lng: 2.2945 }
function Index() {
    const [open, setOpen] = useState<any>(false);
    const [_startPositio,_setStartPosition]=useState<any>();
    const [_endPosition,_setEndPosition]=useState<any>();
    const [_address,_setAddress]=useState<any>();
    const [_latnLong,_setLatnLong]=useState<any>({lat: 48.00,lng:-122.00});
    const [_companyName,_setCompanyName]=useState<any>();
    const [_city,_setCity]=useState<any>();
    const [_country,_setCountry]=useState<any>();
    const [_CompAddress,_setCompAddress]=useState<any>();
    const [_value,_setValue]=useState<any>();
    const createContact = () => {
        setOpen(true);
    }

    const closePopup = () => {
        setOpen(false);
    }
    const onStartChange=(e:any)=>{
debugger;
console.log(e.target.value);
var value=e.target.value;
getLattitude(value);
    }
    const onEndChange=(e:any)=>{
        var value=e.target.value;
        getLattitude(value);
    }
    const onCityChange=(e:any)=>{
        _setCity(e.target.value);
        let city=e.target.value;
        var addres= _companyName +','+_address+','+ _country+','+city;
        getLattitude(addres);
        _setCompAddress(addres);
    }
    const confirm=()=>{

    }
    
  const onLoad = (marker:any) => {
    console.log("marker: ", marker);
  };
    const getLattitude=(value:any)=>{
        debugger;
        let address=value;
        axios.get("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyC1ORE-osqldqThLU8fbD9vAcCr08Ug1LI&address=" + address)
        .then(response=>{
            debugger;
            console.log(response.data);
            _setLatnLong({lat:response.data.results[0].geometry.location.lat,lng:response.data.results[0].geometry.location.lng})
           
        })
      }
      useEffect(()=>{
        debugger;
        // const directionsService = new google.maps.DirectionsService();

        // const origin = { lat: 40.756795, lng: -73.954298 };
        // const destination = { lat: 41.756795, lng: -78.954298 };
    
        // directionsService.route(
        //   {
        //     origin: origin,
        //     destination: destination,
        //     travelMode: google.maps.TravelMode.DRIVING
        //   },
        //   (result, status) => {
        //     if (status === google.maps.DirectionsStatus.OK) {
        //       // this.setState({
        //       //   directions: result
        //       // });
        //     } else {
        //       console.error(`error fetching directions ${result}`);
        //     }
        //   }
        // );
      })
  
    return(
        <div className="bgColor">
            <div className="container-fluid col-md-12 p-4">
                <div className="col-md-4">
                    <div className='pb-3'>
                        Manage all your supplier contacts and your
                        interaction history within this page.
                    </div>
                    <div>
                        {/* <span>
                            <i className='fa fa-search'></i>
                            <input type="text" />
                        </span> */}
                        <TextField
                            id="input-with-icon-textfield"
                            className='searchText w-75'
                            placeholder='Search for a Supplier'
                            label=" "
                            sx={{ '& legend': { display: 'none' }, '& fieldset': { top: 0 },}}
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon className="search" />
                                </InputAdornment>
                            ),
                            }}
                            variant="outlined"
                        />
                    </div>
                </div>
            </div>
            <div className="col-md-12" style={{borderBottom:"2px solid #d3d3d3"}}>
                <Nav className="col-md-6 d-flex justify-content-between navTab" defaultActiveKey="link-1" as="ul">
                    <Nav.Item className='col-md-4' as="li">
                        <Nav.Link eventKey="link-1">Suppliers</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='col-md-4' as="li">
                        <Nav.Link eventKey="link-2">Contacts</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='col-md-4' as="li">
                        <Nav.Link eventKey="link-3">Purchase Orders</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
            <div className='container-fluid col-md-12 yourSupplier p-4'>
                <div className='col-md-12 d-flex justify-content-between align-items-center supplierCont'>
                    <div className='ySupplier'>
                        Your Suppliers
                    </div>
                    <div className='col-md-3 d-flex justify-content-end'>
                        <div className='pR-2'>
                        <Button className="supplyButton ">Import Data</Button>
                        </div>
                        <div className='pL-2'>
                        <Button onClick={()=>createContact()} className="supplyButton">Add Supplier</Button>
                        </div>
                       
                    </div>
                </div>
                <div className='col-md-12'>
                    <div className='d-flex justify-content-center align-items-center' style={{border:"3px dashed #d3d3d3", height:"80vH"}}>
                        <div className='text-center emptyContact'>
                            Your Contacts list is empty!<br />
                            <Button onClick={()=>createContact()}>Click here</Button> to create a new contact.
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-md-12 d-flex'>
                <Dialog className="addNewSupplier" open={open}>
                    <div className='d-flex justify-content-between align-items-center pb-4'>
                        <div><h5 style={{margin:"0px"}}>Add New Supplier</h5></div>
                        <div><CloseIcon className="pointer" onClick={()=>closePopup()} /></div>
                    </div>
                    <div>
                        <form onSubmit={()=>confirm()}>
                            <div className='pt-4 pb-4'>
                                <div className='pb-2'>
                                    <label className='pb-1'>Supplier Company Name</label><br />
                                    <TextField 
                                        className="w-100 confirmText" value={_companyName} onChange={(e:any)=>_setCompanyName(e.target.value)}
                                    />
                                </div>
                                <div className='pb-2'>
                                    <label className='pb-1'>Supplier Company Address</label><br />
                                    <TextField 
                                        className="w-100 confirmText" value={_address} onChange={(e:any)=>_setAddress(e.target.value)}
                                    />
                                </div>
                                <div className='col-md-12 d-flex pb-2'>
                                    <div className='col-md-6 pR-1'>
                                        <label className='pb-1'>Supplier Country</label><br />
                                        <TextField 
                                            select
                                            className="w-100 confirmText" value={_country} onChange={(e:any)=>_setCountry(e.target.value)}
                                        >
                                            <MenuItem value="India">India</MenuItem>
                                            <MenuItem value="Africa">Africa</MenuItem>
                                            <MenuItem value="Sri Lanka">Sri Lanka</MenuItem>
                                        </TextField>
                                    </div>
                                    <div className='col-md-6 pL-1'>
                                        <label className='pb-1'>Supplier City</label><br />
                                        <TextField 
                                            className="w-100 confirmText" value={_city} onChange={(e:any)=>onCityChange(e)}
                                        />
                                    </div>                                
                                </div>
                            </div>
                            <div className='pt-4 pb-4'>
                                <h6 className='font'>Ports</h6>
                                <div className='col-md-12 d-flex'>
                                    <div className='col-md-6 pR-1'>
                                        <label className='pb-1'>Source Port</label><br />
                                        <TextField 
                                            select
                                            className="w-100 confirmText" value={_startPositio} onChange={(e:any)=>onStartChange(e)}
                                        >
                                          <MenuItem value="India">India</MenuItem>
                                            <MenuItem value="Africa">Africa</MenuItem>
                                            <MenuItem value="Sri Lanka">Sri Lanka</MenuItem>
                                            <MenuItem value="Madurai">Madurai</MenuItem>
                                            <MenuItem value="Chennai">Chennai</MenuItem>
                                            <MenuItem value="Vellore">Vellore</MenuItem>
                                        </TextField>
                                    </div>
                                    <div className='col-md-6 pL-1'>
                                        <label className='pb-1'>Destination Port</label><br />
                                        <TextField 
                                            select
                                            className="w-100 confirmText" value={_endPosition} onChange={(e:any)=>onEndChange(e)}
                                        >
                                             <MenuItem value="India">India</MenuItem>
                                            <MenuItem value="Africa">Africa</MenuItem>
                                            <MenuItem value="Sri Lanka">Sri Lanka</MenuItem>
                                        </TextField>
                                    </div>                                
                                </div>
                            </div>
                            <div className='mapArea pb-4'>
                                <div >
                                    <LoadScript
                                        googleMapsApiKey="AIzaSyC1ORE-osqldqThLU8fbD9vAcCr08Ug1LI">
                                            <GoogleMap
                                            mapContainerStyle={mapStyles}
                                            zoom={8}
                                            center={_latnLong}
                                            >
                                              <img src={images}></img>
                                                {/* <DirectionsRenderer origin={{ lat: 40.756795, lng: -73.954298 }} destination={{ lat: 41.756795, lng: -78.954298 }} /> */}
                                            </GoogleMap>
                                            <Marker  title={'The marker`s title will appear as a tooltip.'} onLoad={onLoad} visible={true}  key={_startPositio} position={_latnLong} icon={"http://maps.google.com/mapfiles/ms/icons/blue.png"} />
                                        </LoadScript>   
                                </div>
                                <label>Hover Over a map marker to learn more</label>
                            </div>
                            <div className='pt-4 pb-2'>
                                <Button className="confirmButton">Confirm</Button>
                            </div>
                        </form>
                    </div>
                </Dialog>
            </div>
            
        </div>
    )
    
}

export default Index;