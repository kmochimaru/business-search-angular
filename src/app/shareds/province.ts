export class Province {
  public province_id?: number;
  public province_code?: string;
  public province_name?: string;
  public geo_id?: number;

  static mapClass(model: ServerProvince) {
    const item = new Province();
    item.province_id = model.PROVINCE_ID;
    item.province_code = model.PROVINCE_CODE;
    item.province_name = model.PROVINCE_NAME;
    item.geo_id = model.GEO_ID;
    return item;
  }
}

export class ServerProvince {
  public PROVINCE_ID?: number;
  public PROVINCE_CODE?: string;
  public PROVINCE_NAME?: string;
  public GEO_ID?: number;
}
