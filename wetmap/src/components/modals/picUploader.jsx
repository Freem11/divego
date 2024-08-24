import React, { useState, useContext, useEffect, useRef } from 'react';
import { Container, Form, FormGroup, Label, Input } from 'reactstrap';
import { animated, useSpring } from 'react-spring';
import ConfirmationModal from './confirmationModal.jsx';
import './confirmationModal.css';
import './picUploader.css';
import Button from '@mui/material/Button';
import exifr from 'exifr';
import AutoSuggest from '../autoSuggest/autoSuggest';
import { FileUploader } from 'react-drag-drop-files';
import { useNavigate } from 'react-router-dom';
import { MasterContext } from '../contexts/masterContext';
import { PinContext } from '../contexts/staticPinContext';
import { PictureContext } from '../contexts/pictureContext';
import { SessionContext } from '../contexts/sessionContext';
import { UserProfileContext } from '../contexts/userProfileContext';
import { ModalSelectContext } from '../contexts/modalSelectContext';
import { Iterrator3Context } from '../contexts/iterrator3Context';
import { TutorialContext } from '../contexts/tutorialContext';
import { ChapterContext } from '../contexts/chapterContext';
import PlaceIcon from '@mui/icons-material/Place';
import PhotoIcon from '@mui/icons-material/Photo';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { exifGPSHelper } from '../../helpers/exifGPSHelpers';
import { getToday } from '../../helpers/picUploaderHelpers.js';
import Collapse from '@mui/material/Collapse';
import { insertPhotoWaits } from '../../supabaseCalls/photoWaitSupabaseCalls';
// import { insertPhotoWaits } from "../../axiosCalls/photoWaitAxiosCalls";
// import { uploadphoto, removePhoto } from "../../supabaseCalls/uploadSupabaseCalls";
import {
	uploadphoto,
	removePhoto,
} from '../../cloudflareBucketCalls/cloudflareAWSCalls';
// import { removePhoto } from "../../axiosCalls/uploadAxiosCalls";
import { getAnimalNamesThatFit } from '../../supabaseCalls/photoSupabaseCalls';
import { userCheck } from '../../supabaseCalls/authenticateSupabaseCalls';
import InputField from '../reusables/inputField';
import CustomButton from '../reusables/button/button.jsx';
import SubmitButton from '../reusables/button/submitButton.jsx';
import ModalHeader from '../reusables/modalHeader.jsx';

let filePath1 = './wetmap/src/components/uploads/';
let filePath = '/src/components/uploads/';
let UserId = '';

const screenWidthInital = window.innerWidth;
const screenHeitghInital = window.innerHeight;

const noGPSZone = (
	<div
		style={{
			marginLeft: '2%',
			backgroundColor: 'pink',
			height: '40px',
			width: '95%',
			color: 'red',
			borderRadius: '15px',
		}}
	>
		<h4 style={{ marginLeft: '35px', paddingTop: '10px' }}>
			No GPS Coordinates Found!
		</h4>
	</div>
);

const PicUploader = React.memo((props) => {
	const { animatePicModal, setPicModalYCoord } = props;
	let navigate = useNavigate();
	const { setMasterSwitch } = useContext(MasterContext);
	const { pin, setPin } = useContext(PinContext);
	const [showNoGPS, setShowNoGPS] = useState(false);
	const [list, setList] = useState([]);
	const { photoFile, setPhotoFile } = useContext(PictureContext);
	const { activeSession, setActiveSession } = useContext(SessionContext);
	const { profile, setProfile } = useContext(UserProfileContext);
	const { chosenModal, setChosenModal } = useContext(ModalSelectContext);
	const { itterator3, setItterator3 } = useContext(Iterrator3Context);
	const { tutorialRunning, setTutorialRunning } = useContext(TutorialContext);
	const { chapter, setChapter } = useContext(ChapterContext);

	const fileTypes = ['JPG', 'JPEG', 'PNG'];

	const successModalRef = useRef(null);
	const cautionModalRef = useRef(null);
	const [successModalYCoord, setSuccessModalYCoord] = useState(0);
	const [cautionModalYCoord, setCautionModalYCoord] = useState(0);

	const sucessModalSlide = useSpring({
		from: { transform: `translate3d(0,0,0)` },
		to: { transform: `translate3d(0,${successModalYCoord}px,0)` },
	});

	const cautionModalSlide = useSpring({
		from: { transform: `translate3d(0,0,0)` },
		to: { transform: `translate3d(0,${cautionModalYCoord}px,0)` },
	});

	const animateSuccessModal = () => {
		if (successModalYCoord === 0) {
			setSuccessModalYCoord(-windowHeight);
		} else {
			setSuccessModalYCoord(0);
		}
	};

	const animateCautionModal = () => {
		if (cautionModalYCoord === 0) {
			setCautionModalYCoord(-windowHeight);
		} else {
			setCautionModalYCoord(0);
		}
	};

	window.addEventListener('resize', trackDimensions);

	const [windowWidth, setWindowWidth] = useState(screenWidthInital);
	const [windowHeight, setWindowHeigth] = useState(screenHeitghInital);

	function trackDimensions() {
		setWindowWidth(window.innerWidth);
		setWindowHeigth(window.innerHeight);
	}

	useEffect(() => {
		if (pin.PicDate === '') {
			let Rnow = new Date();

			let rightNow = getToday(Rnow);

			setPin({
				...pin,
				PicDate: rightNow,
			});
		}
	}, []);

	useEffect(() => {
		if (tutorialRunning) {
			if (itterator3 === 11) {
				setItterator3(itterator3 + 1);
			}
		}
	}, [pin.PicDate]);

	const handleChange = async (e) => {
		if (typeof e === 'object') {
			console.log('gotch!', typeof e);
			// return
		}

		if (e.target && e.target.name === 'PicFile') {
			console.log('here?', e);
			setPhotoFile(null);
			if (pin.PicFile !== null) {
				removePhoto({
					filePath: `https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/`,
					fileName: `${pin.PicFile}`,
				});
			}

			let imageFile;
			if (e.target && e.target.files[0]) {
				imageFile = e.target.files[0];
			} else if (e.name) {
				imageFile = e;
			}

			console.log('yo', imageFile);
			let extension = imageFile.name.split('.').pop();
			const fileName = Date.now() + '.' + extension;

			//uploadPhoto
			const data = new FormData();
			data.append('image', imageFile);
			const newFilePath = await uploadphoto(imageFile, fileName);
			setPhotoFile(fileName);
			console.log('create file', photoFile);
			//scrape off photo info
			let formattedDate = pin.PicDate;
			let newLatitude = pin.Latitude;
			let newLongitude = pin.Longitude;
			let baseDate = imageFile.lastModified;
			var convDate = new Date(baseDate);

			formattedDate = getToday(convDate);

			exifr.parse(imageFile, true).then((output) => {
				let EXIFData = exifGPSHelper(
					output.GPSLatitude,
					output.GPSLongitude,
					output.GPSLatitudeRef,
					output.GPSLongitudeRef
				);

				if (EXIFData) {
					newLatitude = EXIFData[0];
					newLongitude = EXIFData[1];
				}
			});

			console.log(
				'pin data',
				fileName,
				formattedDate,
				newLatitude,
				newLongitude
			);
			setPin({
				...pin,
				PicFile: `animalphotos/public/${fileName}`,
				PicDate: formattedDate,
				Latitude: newLatitude,
				Longitude: newLongitude,
			});

			// fetch("http://localhost:5000/api/upload", {
			//   method: "POST",
			//   body: data,
			// })
			//   .then((response) => response.json())
			//   .then((data) => {
			//     setPhotoFile(data.fileName);
			//   });

			if (tutorialRunning) {
				if (itterator3 === 8) {
					setItterator3(itterator3 + 1);
				}
			}
		} else {
			setPin({ ...pin, [e.target.name]: e.target.value });
		}
	};

	const handleNoGPSClose = (e) => {
		setShowNoGPS(false);
		handleChange(e);
		return;
	};

	const handleSelect = (e) => {
		setShowNoGPS(false);
		return;
	};

	const handleNoGPSCloseOnMapChange = () => {
		if (
			itterator3 === 8 ||
			itterator3 === 11 ||
			itterator3 === 14 ||
			itterator3 === 22
		) {
			return;
		}

		setChosenModal('Photos');
		setShowNoGPS(false);
		setMasterSwitch(false);
		animatePicModal();
		if (tutorialRunning) {
			if (itterator3 === 16) {
				setItterator3(itterator3 + 1);
			}
		}
		return;
	};

	let counter = 0;
	let blinker;

	const [imgButState, setImgButState] = useState(false);
	const [datButState, setDatButState] = useState(false);
	const [autoButState, setAutoButState] = useState(false);
	const [pinButState, setPinButState] = useState(false);
	const [subButState, setSubButState] = useState(false);

	function imageBut() {
		counter++;
		if (counter % 2 == 0) {
			setImgButState(false);
		} else {
			setImgButState(true);
		}
	}

	function calendarBut() {
		counter++;
		if (counter % 2 == 0) {
			setDatButState(false);
		} else {
			setDatButState(true);
		}
	}

	function animalField() {
		counter++;
		if (counter % 2 == 0) {
			setAutoButState(false);
		} else {
			setAutoButState(true);
		}
	}

	function pinBut() {
		counter++;
		if (counter % 2 == 0) {
			setPinButState(false);
		} else {
			setPinButState(true);
		}
	}

	function subBut() {
		counter++;
		if (counter % 2 == 0) {
			setSubButState(false);
		} else {
			setSubButState(true);
		}
	}

	function cleanUp() {
		clearInterval(blinker);
		setImgButState(false);
		setDatButState(false);
		setAutoButState(false);
		setPinButState(false);
		setSubButState(false);
	}

	let modalHeigth = 700;

	useEffect(() => {
		if (tutorialRunning) {
			if (itterator3 === 8) {
				blinker = setInterval(imageBut, 1000);
			} else if (itterator3 === 11) {
				blinker = setInterval(calendarBut, 1000);
			} else if (itterator3 === 14) {
				blinker = setInterval(animalField, 1000);
			} else if (itterator3 === 3) {
				setPicModalYCoord(0);
			} else if (itterator3 === 3) {
				setPicModalYCoord(0);
			} else if (itterator3 === 6 || itterator3 === 12 || itterator3 === 15) {
				setPicModalYCoord(-windowHeight + (windowHeight - modalHeigth) / 2);
			} else if (itterator3 === 16) {
				blinker = setInterval(pinBut, 1000);
			} else if (itterator3 === 22) {
				blinker = setInterval(subBut, 1000);
			}
		}
		return () => cleanUp();
	}, [itterator3]);

	const handleSubmit = (e) => {
		e.preventDefault();
		let AnimalV = pin.Animal.toString();
		let LatV = parseFloat(pin.Latitude);
		let LngV = parseFloat(pin.Longitude);

		if (
			pin.PicFile &&
			AnimalV &&
			typeof AnimalV === 'string' &&
			LatV &&
			typeof LatV == 'number' &&
			LngV &&
			typeof LngV == 'number'
		) {
			let Rnow = new Date();

			let rightNow = getToday(Rnow);

			// if (tutorialRunning) {
			if (itterator3 === 22) {
				setItterator3(itterator3 + 1);
			} else {
				// insertPhotoWaits({ ...pin });
				// insertPhotoWaits({ ...pin, PicFile: photoFile });
			}

			setPin({
				...pin,
				PicFile: '',
				PicDate: rightNow,
				Animal: '',
				Latitude: '',
				Longitude: '',
			});
			setPhotoFile('');
			animateSuccessModal();
			return;
		} else {
			animateCautionModal();
		}
	};

	const clearAnimal = () => {
		setPin({ ...pin, Animal: '' });
		setList([]);
	};

	const handleModalClose = () => {
		if (
			itterator3 === 8 ||
			itterator3 === 11 ||
			itterator3 === 14 ||
			itterator3 === 16 ||
			itterator3 === 22
		) {
			return;
		}

		if (pin.PicFile !== null) {
			console.log('called');
			removePhoto({
				filePath: `https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/`,
				fileName: `${pin.PicFile}`,
			});
		}

		setPin({
			...pin,
			PicFile: '',
			PicDate: '',
			Animal: '',
			Latitude: '',
			Longitude: '',
		});
		setShowNoGPS(false);
		setPhotoFile(null);
		animatePicModal();
	};

	function handleClick() {
		document.getElementById('file').click();
	}

	const activateGuide = () => {
		setChapter('Adding your photo');
	};


	const customBtnStyle = {
		width: '4.5vw',
		height: '2.9vh',
		padding: '20px',
	};

	// AutoSuggest props
	const handleChangeAutoSuggest = async (e) => {
		setPin({ ...pin, Animal: e.target.value });

		if (e.target.value.length > 0) {
			let fitleredListOfAnimals = await getAnimalNamesThatFit(e.target.value);
			let animalArray = [];
			fitleredListOfAnimals.forEach((animal) => {
				if (!animalArray.includes(animal.label)) {
					animalArray.push(animal.label);
				}
			});
			setList(animalArray);
		} else {
			setList([]);
		}
	};

	const handleSelectAutoSuggest = (name) => {
		setPin({ ...pin, Animal: name });
		setList([]);
	};

	let waiter;
	useEffect(() => {
		clearTimeout(waiter);

		if (tutorialRunning) {
			if (itterator3 === 14) {
				waiter = setTimeout(() => {
					setItterator3(itterator3 + 1);
				}, 2000);
			}
		}
	}, [pin.Animal]);

	return (
		<>
			<div>
				<ModalHeader
				title={'Submit Your Picture'}
				onClick={() => activateGuide()}
				svg={<QuestionMarkIcon />}
				onClose={handleModalClose}/>
			</div>
			<div className='hero hero-sm p-0'>
			<div className='flex-center-column'>
			{photoFile !== null && (
				<div className='pickie'>
					{/* <div>{photoFile}</div> */}
					<img
						src={`https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoFile}`}
						// src={`https://lsakqvscxozherlpunqx.supabase.co/storage/v1/object/public/${photoFile}`}
						height='200px'
						className='picHolder'
					></img>
				</div>
			)}

			{photoFile === null && (
				<div className='pickie'>
					<FileUploader
						handleChange={handleChange}
						name='file'
						types={fileTypes}
						multiple={false}
						hoverTitle='Drop Here'
						label='Upload or drop a file right here'
					/>
				</div>
			)}

			<div className='column col-6 mb-2'>
				<CustomButton
				onClick={handleClick}
				svg={<PhotoIcon />}
				text={'Choose an Image'}
				imgButState={imgButState}
				/>
				<FormGroup>
					<Input
						placeholder='Upload'
						className='modalInputs2'
						style={{
							textAlign: 'center',
							// fontFamily: "Itim, cursive",
							display: 'none',
						}}
						id='file'
						type='file'
						name='PicFile'
						bsSize='lg'
						onChange={handleChange}
						onClick={(e) => handleNoGPSClose(e)}
					></Input>
				</FormGroup>
			</div>

			<div className='lowerBoxPhoto mt-4'>
				{/* <Collapse in={showNoGPS} orientation="vertical" collapsedSize="0px">
          {noGPSZone}
        </Collapse> */}

				<div className='Tbox'>
					<div className='coordDiv'>
						<div className='inputboxType1'>
							<FormGroup>
								<InputField
									placeholder='Date Taken'
									type='date'
									name='PicDate'
									value={pin.PicDate}
									onChange={handleChange}
									onClick={handleNoGPSClose}
									highlighted={datButState}
								/>
							</FormGroup>
						</div>
						<div
							className={
								autoButState ? 'autosuggestboxPhotoAlt' : 'autosuggestboxPhoto'
							}
							onClick={handleSelect}
						>
							<AutoSuggest
								placeholder='Animal'
								value={pin.Animal}
								list={list}
								clear={clearAnimal}
								handleChange={handleChangeAutoSuggest}
								handleSelect={handleSelectAutoSuggest}
								style1={{
									marginTop: '2vh',
									marginLeft: '1vw',
								}}
								style2={{
									display: 'flex',
									height: '2.5vh',
									paddingLeft: '1vw',
									paddingRight: '1vw',
									listStyle: 'none',
									backgroundColor: '#538bdb',
									borderRadius: '5px',
									alignItems: 'center',
									justifyContent: 'center',
									boxShadow: '3px 3px rgba(0, 0, 0, 0.5)',
									marginBottom: '0.2vh',
									marginLeft: '2vw',
								}}
								style3={{
									color: 'white',
									fontFamily: 'itim',
									fontSize: '1vw',
								}}
							/>
						</div>
						<div className='inputboxType2'>
							<FormGroup>
								<InputField
									placeholder='Latitude'
									type='decimal'
									name='Latitude'
									value={pin.Latitude}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>

						<div className='inputboxType2'>
							<FormGroup>
								<InputField
									placeholder='Longitude'
									type='decimal'
									name='Longitude'
									value={pin.Longitude}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
					</div>
				</div>
				<div className='Tbox2'>
					<CustomButton
						onClick={handleNoGPSCloseOnMapChange}
						svg={<PlaceIcon />}
						btnState={pinButState}
						className={customBtnStyle}
					/>
				</div>
			</div>
			</div>
			</div>
			<FormGroup>
				<SubmitButton active={!!subButState} onClick={handleSubmit}>
					Submit Photo
				</SubmitButton>
			</FormGroup>

			<animated.div
				className='successModal modalBase'
				style={sucessModalSlide}
				ref={successModalRef}
			>
				<ConfirmationModal
					submissionItem='sea creature submission'
					animateModal={animateSuccessModal}
					handleClose={handleModalClose}
					isSuccess={true}
				/>
			</animated.div>

			<animated.div
				className='cautionModal modalBase'
				style={cautionModalSlide}
				ref={cautionModalRef}
			>
				<ConfirmationModal
					submissionItem='sea creature submission'
					animateModal={animateCautionModal}
					isSuccess={false}
				/>
			</animated.div>
		</>
	);
});

export default PicUploader;
