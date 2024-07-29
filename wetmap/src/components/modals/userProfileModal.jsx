import React, { useState, useContext, useEffect } from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import {
	grabProfileById,
	getProfileWithStats,
	updateProfile,
} from '../../supabaseCalls/accountSupabaseCalls';
import { SessionContext } from '../contexts/sessionContext';
import { UserProfileContext } from '../contexts/userProfileContext';
import { ProfileModalContext } from '../contexts/profileModalContext';
import { SelectedProfileContext } from '../contexts/selectedProfileModalContext';
import { AnchorModalContext } from '../contexts/anchorModalContext';
import {
	insertUserFollow,
	deleteUserFollow,
	checkIfUserFollows,
} from '../../supabaseCalls/userFollowSupabaseCalls';
import './userProfile.css';
import CloseButton from '../closeButton/closeButton';
import InputField from '../reusables/inputField';
import SubmitButton from '../reusables/button/submitButton';
import TitleModal from '../reusables/titleModal';

export default function UserProfileModal(props) {
	const { animateProfileModal } = props;
	const { activeSession } = useContext(SessionContext);
	const { profile, setProfile } = useContext(UserProfileContext);
	const [profileCloseState, setProfileCloseState] = useState(false);
	const [imaButState, setImaButState] = useState(false);
	const [followButState, setFollowButState] = useState(false);
	const [userFollows, setUserFollows] = useState(false);
	const [picUri, setPicUri] = useState(null);
	const { profileModal, setProfileModal } = useContext(ProfileModalContext);
	const [userStats, setUserStats] = useState('');
	const { selectedProfile, setSelectedProfile } = useContext(
		SelectedProfileContext
	);
	const { siteModal, setSiteModal } = useContext(AnchorModalContext);
	const [followData, setFollowData] = useState(activeSession.user.id);
	const [username, setUsername] = useState(null);
	const [formError, setFormError] = useState(null);
	const [saveButState, setSaveButState] = useState(false);

	const handleFollow = async (userName) => {
		// if (profile[0].UserID === picOwnerAccount[0].UserID){
		//   return
		// }

		if (userFollows) {
			deleteUserFollow(followData);
			setUserFollows(false);
		} else {
			if (userStats) {
				let newRecord = await insertUserFollow(
					profile[0].UserID,
					userStats[0].userid
				);
				setFollowData(newRecord[0].id);
				setUserFollows(true);
			}
		}
	};

	useEffect(() => {
		getProfile();

		async function followCheck() {
			let alreadyFollows = await checkIfUserFollows(
				activeSession.user.id,
				selectedProfile
			);
			if (alreadyFollows.length > 0) {
				setUserFollows(true);
				setFollowData(alreadyFollows[0].id);
			}
		}

		followCheck();
	}, []);

	useEffect(() => {
		getProfile();

		async function followCheck() {
			let alreadyFollows = await checkIfUserFollows(
				activeSession.user.id,
				selectedProfile
			);
			if (alreadyFollows.length > 0) {
				setUserFollows(true);
				setFollowData(alreadyFollows[0].id);
			}
		}

		followCheck();
	}, [profileModal, selectedProfile]);

	const getProfile = async () => {
		let userID;
		if (selectedProfile) {
			userID = selectedProfile;
		} else {
			userID = activeSession.user.id;
		}

		try {
			const success = await getProfileWithStats(userID);
			if (success) {
				setUserStats(success);
			}
		} catch (e) {
			console.log({ title: 'Error', message: e.message });
		}
	};

	const toggleProfileModal = () => {
		setProfileModal(false);

		if (selectedProfile) {
			setSiteModal(true);
			setSelectedProfile(null);
		}
	};

	const handleSubmit = async () => {
		if (!userStats || !userStats[0]) {
			return true;
		}
		if (username === null) {
			// user never touched the input
			return true;
		}
		if (username === userStats[0].username) {
			// no changes
			return true;
		}
		if (username === '') {
			setFormError('Your Username cannot be blank!');
			return false;
		}

		try {
			await updateProfile({
				id: activeSession.user.id,
				username: username,
			});
			return true;
		} catch (e) {
			if (e && e.code === '23505') {
				setFormError('This username belongs to another user');
				return false;
			}
			setFormError('Something went wrong. Please try later.');
			console.log({ title: 'Error', message: e.message });
			return false;
		}
	};

	const customBtnStyle = {
		width: '3.4vw',
		height: '3.3vh',
		padding: '13px',
		marginLeft: '-20px',
		marginRight: '10px',
	};

	return (
		<div className='containerBox'>
			<div className='titleDiv'>
				<TitleModal
					title={
						selectedProfile
							? userStats && userStats[0].username + "'s Diving"
							: 'My Diver Profile'
					}
				/>
				<CloseButton onClick={toggleProfileModal} />
			</div>

			<div className='inputContainer'>
				{selectedProfile ? (
					<div
						onClick={() => handleFollow()}
						className={userFollows ? 'followButtoAlt' : 'followButton'}
					>
						<Label
							style={{
								fontFamily: 'Itim',
								fontWeight: 'bold',
								color: userFollows ? 'black' : 'pink',
								cursor: 'pointer',
								fontSize: '1vw',
							}}
						>
							{userFollows
								? 'Following ' + (userStats && userStats[0].username)
								: 'Follow ' + (userStats && userStats[0].username)}
						</Label>
					</div>
				) : (
					<>
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
								width: '100%',
							}}
						>
							<div className='inputboxS'>
								<InputField
									placeholder='Diver Name'
									name='userField'
									value={
										username !== null
											? username
											: userStats && userStats[0].username
									}
									onChange={(e) => setUsername(e.target.value)}
									style={{ width: '25vw' }}
								/>
							</div>
						</div>

						<div className='inputbox'>
							<InputField
								placeholder='Email'
								name='emailField'
								value={userStats && userStats[0].email}
								style={{ width: '25vw' }}
							/>
						</div>
					</>
				)}

				<div className='statsContainer'>
					<div className='inputboxMini'>
						<InputField
							name='photoCountField'
							value={
								'Sea Life: ' + (userStats && ' ' + userStats[0].photocount)
							}
							contentEditable={false}
						/>
					</div>

					<div className='inputboxMini'>
						<InputField
							name='diveSiteCountField'
							value={
								'Dive Sites: ' + (userStats && ' ' + userStats[0].divesitecount)
							}
							contentEditable={false}
						/>
					</div>

					<div className='inputboxMini'>
						<InputField
							name='followerCountField'
							value={
								'Followers: ' + (userStats && ' ' + userStats[0].followercount)
							}
							contentEditable={false}
						/>
					</div>

					<div className='inputboxMini'>
						<InputField
							name='commentCountField'
							value={
								'Comments: ' + (userStats && ' ' + userStats[0].commentcount)
							}
							contentEditable={false}
						/>
					</div>

					<div className='inputboxMini'>
						<InputField
							name='likeCountField'
							value={'Likes: ' + (userStats && ' ' + userStats[0].likecount)}
							contentEditable={false}
						/>
					</div>

					{formError && <p className='erroMsgU'>{formError}</p>}

					<SubmitButton
						onClick={async () => {
							(await handleSubmit()) && toggleProfileModal();
						}}
					>
						Save changes
					</SubmitButton>
				</div>
			</div>
		</div>
	);
}
