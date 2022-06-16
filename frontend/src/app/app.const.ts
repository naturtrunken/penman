import {AppEnvVariables} from "../environments/environment.vars";

export class AppConst {
  public static APP_NAME = 'PenMan';
  public static SETTING_HTTP_RETRY_COUNT = 0;

  public static AUTH_MIN_EMAIL_LENGTH = 3;
  public static AUTH_MIN_PASSWORD_LENGTH = 8;

  // Has to be the same as in the backend (config/initializers/global.rb).
  public static FILE_UPLOAD_MAX_ELEMENTS = 10;
  public static FILE_UPLOAD_PREVIEW_HEIGHT_PX = 100;

  public static BACKEND_AUTH_LOGIN_PATH = AppEnvVariables.BACKEND_API_URL + '/auth/sign_in';
  public static BACKEND_AUTH_REGISTER_PATH = AppEnvVariables.BACKEND_API_URL + '/auth';
  public static BACKEND_AUTH_LOGOUT_PATH = AppEnvVariables.BACKEND_API_URL + '/auth/sign_out';

  public static BACKEND_NETWORKS_INDEX_PATH = AppEnvVariables.BACKEND_API_URL + '/v1/users/:user_id/networks';
  public static BACKEND_NETWORKS_SHOW_PATH = AppEnvVariables.BACKEND_API_URL + '/v1/users/:user_id/networks/:id';
  public static BACKEND_NETWORKS_CREATE_PATH = this.BACKEND_NETWORKS_INDEX_PATH;
  public static BACKEND_NETWORKS_UPDATE_PATH = this.BACKEND_NETWORKS_SHOW_PATH;
  public static BACKEND_NETWORKS_DELETE_PATH = this.BACKEND_NETWORKS_SHOW_PATH;

  public static BACKEND_TARGETS_INDEX_PATH = AppEnvVariables.BACKEND_API_URL + '/v1/users/:user_id/networks/:network_id/targets';
  public static BACKEND_TARGETS_SHOW_PATH = AppEnvVariables.BACKEND_API_URL + '/v1/users/:user_id/networks/:network_id/targets/:id';
  public static BACKEND_TARGETS_CREATE_PATH = this.BACKEND_TARGETS_INDEX_PATH;
  public static BACKEND_TARGETS_UPDATE_PATH = this.BACKEND_TARGETS_SHOW_PATH;
  public static BACKEND_TARGETS_DELETE_PATH = this.BACKEND_TARGETS_SHOW_PATH;
  public static BACKEND_TARGETS_TIMELINE_PATH = AppEnvVariables.BACKEND_API_URL + '/v1/users/:user_id/networks/:network_id/targets/:target_id/timeline';

  public static BACKEND_BLOCKS_INDEX_PATH = AppEnvVariables.BACKEND_API_URL + '/v1/users/:user_id/networks/:network_id/targets/:target_id/blocks';
  public static BACKEND_BLOCKS_CREATE_PATH = this.BACKEND_BLOCKS_INDEX_PATH;
  public static BACKEND_BLOCKS_DELETE_PATH = AppEnvVariables.BACKEND_API_URL + '/v1/users/:user_id/networks/:network_id/targets/:target_id/blocks/:id';
  public static BACKEND_BLOCKS_UPDATE_PATH = this.BACKEND_BLOCKS_DELETE_PATH;

  public static BACKEND_CHECKLIST_ELEMENTS_UPDATE_PATH = AppEnvVariables.BACKEND_API_URL + '/v1/users/:user_id/networks/:network_id/targets/:target_id/blocks/:block_id/checklist_elements/:id';

  public static BACKEND_SERVICES_INDEX_PATH = AppEnvVariables.BACKEND_API_URL + '/v1/users/:user_id/networks/:network_id/targets/:target_id/services';
  public static BACKEND_SERVICES_DELETE_PATH = AppEnvVariables.BACKEND_API_URL + '/v1/users/:user_id/networks/:network_id/targets/:target_id/services/:id';
  public static BACKEND_SERVICES_CREATE_PATH = this.BACKEND_SERVICES_INDEX_PATH;

  public static BACKEND_API_KEY_SHOW_PATH = AppEnvVariables.BACKEND_API_URL + '/v1/users/:user_id/api_key';
  public static BACKEND_API_KEY_CREATE_PATH = this.BACKEND_API_KEY_SHOW_PATH;

  public static BACKEND_ATTACK_VECTORS_INDEX_PATH = AppEnvVariables.BACKEND_API_URL + '/v1/users/:user_id/networks/:network_id/targets/:target_id/attack_vectors';
  public static BACKEND_ATTACK_VECTORS_DELETE_PATH = AppEnvVariables.BACKEND_API_URL + '/v1/users/:user_id/networks/:network_id/targets/:target_id/attack_vectors/:id';
  public static BACKEND_ATTACK_VECTORS_CREATE_PATH = this.BACKEND_ATTACK_VECTORS_INDEX_PATH;
  public static BACKEND_ATTACK_VECTORS_UPDATE_PATH = this.BACKEND_ATTACK_VECTORS_DELETE_PATH;

  public static BACKEND_IDEAS_INDEX_PATH = AppEnvVariables.BACKEND_API_URL + '/v1/users/:user_id/networks/:network_id/targets/:target_id/ideas';
  public static BACKEND_IDEAS_DELETE_PATH = AppEnvVariables.BACKEND_API_URL + '/v1/users/:user_id/networks/:network_id/targets/:target_id/ideas/:id';
  public static BACKEND_IDEAS_CREATE_PATH = this.BACKEND_IDEAS_INDEX_PATH;
  public static BACKEND_IDEAS_UPDATE_PATH = this.BACKEND_IDEAS_DELETE_PATH;

  public static BACKEND_TIME_ENTRIES_INDEX_PATH = AppEnvVariables.BACKEND_API_URL + '/v1/users/:user_id/networks/:network_id/targets/:target_id/time_entries';
  public static BACKEND_TIME_ENTRIES_CREATE_PATH = this.BACKEND_TIME_ENTRIES_INDEX_PATH;
}
