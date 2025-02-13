import React from 'react';
import styles from './style.module.scss';
import Icon from '../../../icons/Icon';
import { DiveSiteWithUserName } from '../../../entities/diveSite';
import EmptyState from '../emptyState';
import Loader from '../loader';
import Tooltip from '../tooltip';
import screenData from '../../newModals/screenData.json';

type SiteSelectorViewProps = {
  sites:            DiveSiteWithUserName[] | null
  handleSitesAdd:   () => void
  handleSiteRemove: (id: number) => void
  error:            boolean
};

export default function SiteSelectorView({ sites, handleSitesAdd, handleSiteRemove, error }: SiteSelectorViewProps) {
  return (
    <>
      <div className={styles.siteSelector}>
        {sites === null && (
          <div className={styles.loadingState}><Loader /></div>
        )}

        {sites !== null && sites.length === 0 && (
          <EmptyState
            onClick={handleSitesAdd}
            visual={(
              <div className={styles.emptyStateIcons}>
                <Icon name="anchor" className={styles.emptyStateIconLeft} />
                <Icon name="anchor" className={styles.emptyStateIcon} />
                <Icon name="anchor" className={styles.emptyStateIconRight} />
              </div>
            )}
            text="No dive sites yet."
            error={error}
          />
        )}

        {sites !== null && sites.length > 0 && (
          <div className={styles.siteList}>
            {sites.map(site => (
              <div key={site.id} className={styles.site}>
                <div className={styles.siteLeft}>
                  <Icon name="anchor" />
                  <span>{site.name}</span>
                </div>
                <div className={styles.siteRight}>
                  <div className={styles.siteActions}>
                    <Icon name="close" onClick={() => handleSiteRemove(site.id)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}


        <button className={styles.button} type="button" onClick={handleSitesAdd}>
          <Tooltip content={screenData.TripCreator.sitelistTooltip} direction="bottom">
            <div className={styles.button}>
              <Icon name="add" />
              <span>Add dive sites</span>
            </div>
          </Tooltip>
        </button>

      </div>
    </>
  );
}
