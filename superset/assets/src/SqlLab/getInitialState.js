import shortid from 'shortid';
import { t } from '../locales';
import getToastsFromPyFlashMessages from '../messageToasts/utils/getToastsFromPyFlashMessages';

export default function getInitialState({ defaultDbId, ...restBootstrapData }) {
  const defaultQueryEditor = {
    id: shortid.generate(),
    title: t('Untitled Query'),
    sql: 'SELECT *\nFROM\nWHERE',
    selectedText: null,
    latestQueryId: null,
    autorun: false,
    dbId: defaultDbId,
  };

  return {
    featureFlags: restBootstrapData.common.feature_flags,
    sqlLab: {
      alerts: [],
      queries: {},
      databases: {},
      queryEditors: [defaultQueryEditor],
      tabHistory: [defaultQueryEditor.id],
      tables: [],
      queriesLastUpdate: Date.now(),
      activeSouthPaneTab: 'Results',
      ...restBootstrapData,
    },
    messageToasts: getToastsFromPyFlashMessages(
      (restBootstrapData.common || {}).flash_messages || [],
    ),
  };
}
