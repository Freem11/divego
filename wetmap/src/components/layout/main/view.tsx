import React from 'react';
import MainSearch from '../search';
import MapLoader from '../../googleMap';
import Icon from '../../../icons/Icon';
import ButtonIcon from '../../reusables/buttonIcon';
import blackMantaIcon from '../../../images/Matt_Manta_Black.png';
import whiteMantaIcon from '../../../images/Matt_Manta_White.png';
import style from './style.module.scss';
import Tabs from '../../reusables/tabs';
import Modal from '../../reusables/modal/modal';
import AppleLinkButton from '../../../images/AppleCTA.png';
import GoogleLinkButton from '../../../images/GoogleCTA.png';
import Emilio from '../../../images/EmilioNew.png';
import { BoundaryDiveShops } from '../../boundaryDiveShops';
import { BoundaryAnimals } from '../../boundaryAnimals';
import { BoundaryDiveSites } from '../../boundaryDiveSites';
import Tooltip, { TOOLTIP_DIRECTION } from '../../reusables/tooltip';
import ScreenData from '../../newModals/screenData.json';

type LayoutMainViewProps = {
  mapConfig:                 number
  animateSiteSubmitterModal: () => void
  animateProfileModal:       () => void
  animateSettingsModal:      () => void
  animateGuidesModal:        () => void
  animateShopsListModal:     () => void
  isPartnerAccount:          boolean
};


export default function LayoutMainView(props: LayoutMainViewProps) {
  return (
    <div className="bg-white">
      <header style={{ minHeight: '10vh' }}>
        <div className="container-fluid">
          <div className="cols col-gapless">

            <div className="col-md-12 col-3 mt-1">
              <a href="index.html" className={style.mainLogo} style={{ color: 'black', marginTop: 10 }}>
                <img src={blackMantaIcon} height={50} alt="logo" style={{ marginBottom: 5 }} />
                Scuba SEAsons
              </a>
            </div>
            <div className="col-md-12 col-6 mt-1">
              <MainSearch />
            </div>
            <div className="col-md-0 col-1">
            </div>
            <div className="col-md-12 col-2 mt-2 flex-centered justify-content-sm-center justify-content-flex-start">

              <ul className={style.headerIcons}>
                <li>
                  <Tooltip content={ScreenData.MainPage.profileTooltip} direction={TOOLTIP_DIRECTION.BOTTOM}>
                    <ButtonIcon
                      disabled={props.mapConfig === 0 ? false : true}
                      icon={<Icon name="person" className="text-blue" style={{ scale: '1.5' }} />}
                      onClick={props.animateProfileModal}
                    />
                  </Tooltip>
                </li>
                <li>
                  <Tooltip content={ScreenData.MainPage.settingsTooltip} direction={TOOLTIP_DIRECTION.BOTTOM}>
                    <ButtonIcon
                      disabled={props.mapConfig === 0 ? false : true}
                      icon={<Icon name="settings" className="text-blue" style={{ scale: '1.5' }} />}
                      onClick={props.animateSettingsModal}
                    />
                  </Tooltip>
                </li>
                <li style={{ marginTop: '2px' }}>
                  <Tooltip content={ScreenData.MainPage.newDiveSiteTooltip} direction={TOOLTIP_DIRECTION.BOTTOM}>
                    <ButtonIcon
                      disabled={props.mapConfig === 0 ? false : true}
                      icon={<Icon name="anchor-plus" className="text-blue" style={{ scale: '1.45' }} />}
                      onClick={props.animateSiteSubmitterModal}
                    />
                  </Tooltip>
                </li>
                {props.isPartnerAccount
                  ? (
                      <li style={{ marginTop: '2px', marginRight: '10px' }}>
                        <Tooltip content={ScreenData.MainPage.tripCreatorTooltip} direction={TOOLTIP_DIRECTION.BOTTOM}>
                          <ButtonIcon
                            disabled={props.mapConfig === 0 ? false : true}
                            icon={<Icon name="diving-scuba-flag" className="text-blue" style={{ scale: '1.5' }} />}
                            onClick={props.animateShopsListModal}
                          />
                        </Tooltip>
                      </li>
                    )
                  :                   (
                      <li style={{ marginTop: '2px', marginRight: '10px' }}>
                        <Tooltip content={ScreenData.MainPage.guideTooltip} direction={TOOLTIP_DIRECTION.BOTTOM}>
                          <ButtonIcon
                            disabled={props.mapConfig === 0 ? false : true}
                            icon={<Icon name="question-mark" className="text-blue" style={{ scale: '1.5' }} />}
                            onClick={props.animateGuidesModal}
                          />
                        </Tooltip>
                      </li>
                    )}
              </ul>

              <div className="cart text-end d-none d-lg-block dropdown">
                <button className="border-0 bg-transparent d-flex flex-column gap-2 lh-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart" aria-controls="offcanvasCart">
                  <span className="fs-6 text-muted dropdown-toggle">Your Cart</span>
                  <span className="cart-total fs-5 fw-bold">$1290.00</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </header>

      <section>
        <div className="container-fluid">
          <div className="cols col-gapless mb-4">
            <div className="col-md-12 col-3 full-height scroll-container mb-4" style={{ overflow: 'hidden', height: '90vh' }}>
              <Tabs
                className="scroll-container non-scrollable"
                data={[
                  { key: 't-1', className: 'scroll-container non-scrollable', title: 'Dive Sites',    content: BoundaryDiveSites },
                  { key: 't-2', className: 'scroll-container non-scrollable', title: 'Sea Life',      content: BoundaryAnimals },
                  { key: 't-3', className: 'scroll-container non-scrollable', title: 'Dive Centers',  content: BoundaryDiveShops },
                ]}
              />

              {/* <div className="hero">
                <div className="hero-body">
                  <div className="bg-gray">AAA</div>
                </div>
                <div className="hero-body">
                  <div className="bg-gray">AAA</div>
                </div>
                <div className="hero-body">
                  <div className="bg-gray">AAA</div>
                </div>

              </div> */}
            </div>

            <div className="col-md-12 col-9 full-height" style={{ height: '90vh' }}>
              <MapLoader />
            </div>
          </div>
        </div>


      </section>

      <footer className={style.footer}>
        <div className="container-fluid">
          <div className="cols col-gapless">

            <div className="cols col-12">
              <div className="col-12 pl-8 mt-6">
                <div className={style.lowerLogo}>
                  <img src={whiteMantaIcon} height={40} alt="logo" style={{ marginBottom: 5, marginRight: 7 }} />
                  Scuba SEAsons
                </div>
              </div>
              <div className="col-sm-0 col-1"></div>
              <div className="col-sm-12 col-md-12 col-4">
                <div className={style.headers}>
                  Available on Mobile
                  <div className="mobile-links flex-centered  justify-content-sm-center justify-content-flex-start mt-6">
                    <a href="https://apps.apple.com/us/app/divego/id6450968950" target="_blank" rel="noreferrer">
                      <img  src={AppleLinkButton} height={60} />
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=com.freem11.divegomobile" target="_blank" rel="noreferrer">
                      <img  src={GoogleLinkButton} height={60} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-4">
                <div className={style.headers}>
                  Connect with us
                  <div className="social-links flex-row-between mt-10 col-8 col-md-6 col-sm-10">
                    <a href="https://www.facebook.com/profile.php?id=61554622375177" target="_blank" rel="noreferrer">
                      <ButtonIcon icon={<Icon name="facebook" color="white" style={{ scale: '2' }} />} />
                    </a>
                    <a href="https://www.instagram.com/scuba_seasons" target="_blank" rel="noreferrer">
                      <ButtonIcon icon={<Icon name="instagram" color="white" style={{ scale: '2' }} />} />
                    </a>
                    <a href="https://www.youtube.com/@ScubaSEAsons/videos" target="_blank" rel="noreferrer">
                      <ButtonIcon icon={<Icon name="youtube" color="white" style={{ scale: '2.5' }} />} />
                    </a>
                    <div onClick={() => window.location.href = 'mailto:scubaseasons@gmail.com'}>
                      <ButtonIcon icon={<Icon name="email-send-outline" color="white" style={{ scale: '2' }} />} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-2">
                <img src={Emilio} height={200} className={style.emilio} />
              </div>
              <div className="col-md-0 col-1"></div>
              <div className="col-12">
                <p className={style.footerRights}>© 2025. All rights reserved.</p>
              </div>
            </div>

            {/* <div className="col-md-2 col-sm-6">
              <div className="footer-menu">
                <h5 className="widget-title">Explore</h5>
                <ul className="menu-list list-unstyled">
                  <li className="menu-item">
                    <a href="#" className="nav-link">Contries</a>
                  </li>
                  <li className="menu-item">
                    <a href="#" className="nav-link">Regions</a>
                  </li>
                  <li className="menu-item">
                    <a href="#" className="nav-link">Cities</a>
                  </li>
                  <li className="menu-item">
                    <a href="#" className="nav-link">Parks</a>
                  </li>
                  <li className="menu-item">
                    <a href="#" className="nav-link">Trails</a>
                  </li>
                  <li className="menu-item">
                    <a href="#" className="nav-link">Points of Interest</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2 col-sm-6">
              <div className="footer-menu">
                <h5 className="widget-title">Maps</h5>
                <ul className="menu-list list-unstyled">
                  <li className="menu-item">
                    <a href="#" className="nav-link">My maps</a>
                  </li>
                  <li className="menu-item">
                    <a href="#" className="nav-link">Create map</a>
                  </li>
                  <li className="menu-item">
                    <a href="#" className="nav-link">Privacy Policy</a>
                  </li>
                  <li className="menu-item">
                    <a href="#" className="nav-link">Print maps</a>
                  </li>
                  <li className="menu-item">
                    <a href="#" className="nav-link">Route Converter</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2 col-sm-6">
              <div className="footer-menu">
                <h5 className="widget-title">Company</h5>
                <ul className="menu-list list-unstyled">
                  <li className="menu-item">
                    <a href="#" className="nav-link">About</a>
                  </li>
                  <li className="menu-item">
                    <a href="#" className="nav-link">Jobs</a>
                  </li>
                  <li className="menu-item">
                    <a href="#" className="nav-link">Press</a>
                  </li>
                  <li className="menu-item">
                    <a href="#" className="nav-link">Ambassadors</a>
                  </li>
                  <li className="menu-item">
                    <a href="#" className="nav-link">Affiliates</a>
                  </li>
                  <li className="menu-item">
                    <a href="#" className="nav-link">Influencers</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-3 col-md-6 col-sm-6">
              <div className="footer-menu">
                <h5 className="widget-title">Comunity</h5>
                <p>Subscribe to our newsletter to get updates about our grand offers.</p>
                <form className="d-flex mt-3 gap-0" role="newsletter">
                  <input className="form-control rounded-start rounded-0 bg-light" type="email" placeholder="Email Address" aria-label="Email Address"></input>
                  <button className="btn btn-dark rounded-end rounded-0" type="submit">Subscribe</button>
                </form>
              </div>
            </div> */}

          </div>
        </div>
      </footer>
      <Modal />
    </div>
  );
}
