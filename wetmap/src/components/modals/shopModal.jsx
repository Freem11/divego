import React, { useState, useContext, useEffect } from 'react';
import Itinerary from '../itineraries/itinerary';
import { itineraries } from '../../supabaseCalls/itinerarySupabaseCalls';
import { SelectedShopContext } from '../contexts/selectedShopContext';
import { ShopModalContext } from '../contexts/shopModalContext';
import { MasterContext } from '../contexts/masterContext';
import { CoordsContext } from '../contexts/mapCoordsContext';
import { ZoomHelperContext } from '../contexts/zoomHelperContext';
import './shopModal.css';
import { shops } from '../../supabaseCalls/shopsSupabaseCalls';
import CloseButton from '../closeButton/closeButton';

export default function ShopModal(props) {
	// const {lat, lng, setSelectedPhoto, setPhotoBoxModel } = props
	const { shopModal, setShopModal } = useContext(ShopModalContext);
	const { selectedShop, setSelectedShop } = useContext(SelectedShopContext);
	const [siteCloseState, setSiteCloseState] = useState(false);
	const [itineraryList, setItineraryList] = useState('');
	const [selectedID, setSelectedID] = useState(null);
	const { masterSwitch, setMasterSwitch } = useContext(MasterContext);
	const { mapCoords, setMapCoords } = useContext(CoordsContext);
	const { zoomHelper, setZoomHelper } = useContext(ZoomHelperContext);

	useEffect(() => {
		if (selectedShop[0]) {
			getItineraries(selectedShop[0].id);
			setMasterSwitch(true);
		}
	}, [selectedShop]);

	useEffect(() => {
		if (shopModal && zoomHelper) {
			setMapCoords([selectedShop[0].lat, selectedShop[0].lng]);
		}
	}, [shopModal]);

	const getItineraries = async (IdNum) => {
		try {
			const itins = await itineraries(IdNum);
			if (itins.length > 0) {
				setItineraryList(itins);
			}
		} catch (e) {
			console.log({ title: 'Error', message: e.message });
		}
	};

	const handleShopModalClose = () => {
		setSelectedShop({ ...selectedShop, id: 0, orgName: '' });
		setItineraryList('');
		setShopModal(false);
	};

	return (
		<div
			style={{
				height: '98%',
				// backgroundColor: "orange",
				overflow: 'hidden',
			}}
		>
			<div className='titleAlt'>
				<div>
					<h3 className='headerAlt'>
						{selectedShop[0] && selectedShop[0].orgName}
					</h3>
				</div>
				<CloseButton onClick={handleShopModalClose} />
			</div>

			<div style={{ marginTop: '3%', width: '100%', borderRadius: 15 }}>
				<div className='container5'>
					{itineraryList &&
						itineraryList.map((itinerary) => {
							return (
								<Itinerary
									key={itinerary.id}
									itinerary={itinerary}
									setSelectedID={setSelectedID}
									selectedID={selectedID}
									setShopModal={setShopModal}
								/>
							);
						})}
					{itineraryList.length === 0 && (
						<div>
							<p className='noSightings'>
								No Trips are currently being offered.
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
