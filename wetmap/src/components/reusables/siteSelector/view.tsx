import React from 'react';
import styles from './style.module.scss';
import Icon from '../../../icons/Icon';
import { DiveSiteWithUserName } from '../../../entities/diveSite';
import EmptyState from '../emptyState';
import Loader from '../loader';

type SiteSelectorViewProps = {
  sites:            DiveSiteWithUserName[] | null
  handleSitesAdd:   () => void
  handleSiteRemove: (id: number) => void
};

export default function SiteSelectorView({ sites, handleSitesAdd, handleSiteRemove }: SiteSelectorViewProps) {
  return (
    <>
      <div className={styles.siteSelector}>
        {sites === null
          ? (
              <div className={styles.loadingState}>
                <Loader />
              </div>
            )
          : (
              sites.length === 0
                ? (
                    <EmptyState
                      visual={(
                        <div className={styles.emptyStateIcons}>
                          <Icon name="anchor" className={styles.emptyStateIconLeft} />
                          <Icon name="anchor" className={styles.emptyStateIcon} />
                          <Icon name="anchor" className={styles.emptyStateIconRight} />
                        </div>
                      )}
                      text="No dive sites yet."
                    />

                  )
                : (
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
                  )
            )}
        <button className={styles.button} type="button" onClick={handleSitesAdd}>
          <Icon name="add" />
          <span>Add dive sites</span>
        </button>
      </div>
    </>
  );
}
