import Footer from "../Client/Footer/Footer";
import Header from "../Client/Header/Header";

function BookingDemo() {
  return (
    <>
      <div style={{ position: "fixed", zIndex: "1000", width: "100%" }}>
        <Header />
      </div>
      <div
        id="wrap"
        style={{ position: "relative", top: "100px" }}
        className="js_sale o_wsale_products_page"
      >
        <div
          className="oe_structure oe_empty oe_structure_not_nearest"
          id="oe_structure_website_sale_products_1"
          data-editor-message="DRAG BUILDING BLOCKS HERE"
        >
          <section
            className="s_text_image o_colored_level pb0 pt4"
            data-snippet="s_text_image"
            data-name="Text - Image"
          >
            <div className="container" 
            style={{padding: 0 }}
            >
              <div
                className="row align-items-center"
                data-bs-original-title=""
                title=""
                aria-describedby="tooltip975944"
              >
                <div className="col-lg-6 pt16 o_colored_level pb0">
                  <h1 style={{ textAlign: "center" }}>
                    <font
                      className="text-gradient"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, rgb(47, 128, 237) 0%, rgb(178, 255, 218) 100%)",
                      }}
                    >
                      Đặt dịch vụ giặt ủi Online
                    </font>
                  </h1>
                  <p>
                    <em>
                      <span style={{ fontSize: "12px" }}>
                        Đặt các dịch vụ giặt ủi, làm sạch cho sản phẩm quần áo
                        thời trang của bạn trực tuyến ở bất kỳ nơi đâu - Hoặc
                        đặt lịch dịch vụ Online vào bất kỳ lúc nào. Chẳng còn
                        bận tâm tìm kiếm Tiệm giặt ủi gần nhất, Giặt ủi 247 sẽ
                        lấy tận nơi giao tận cửa nhà cho bạn!
                      </span>
                      &nbsp;
                    </em>
                    <br />
                  </p>
                  <h2>Đặt trực tuyến (Online)</h2>
                  <ul>
                    <li>
                      Chọn bất kỳ dịch vụ giặt ủi, giặt sấy hoặc giặt
                      hấp&nbsp;phù hợp với nhu cầu của bạn rất dễ dàng và thân
                      thiện.
                    </li>
                    <li>
                      Sử dụng chức năng <strong>tìm kiếm</strong> sản phẩm hoặc
                      theo&nbsp;danh mục dịch vụ&nbsp;để khâu đặt nhanh chóng
                      hơn.
                    </li>
                    <li>
                      Thêm sản phẩm cùng với&nbsp;dịch vụ giặt ủi tương ứng vào
                      danh sách mong muốn (<strong>Wishlist</strong>) và&nbsp;
                      <strong>lưu lại </strong>cho lần đặt tiếp theo được nhanh
                      hơn.
                    </li>
                    <li>
                      Tích{" "}
                      <strong style={{ fontWeight: "bolder" }}>
                        Express LaunDry
                      </strong>
                      &nbsp;để 247 thực hiện giặt ủi và giao lại quần áo siêu
                      tốc cho bạn*.
                    </li>
                  </ul>
                  <h2>Đặt lịch giặt ủi&nbsp;(Booking)</h2>
                  <section
                    className="s_website_form pt16 pb8"
                    data-vcss="001"
                    data-snippet="s_website_form"
                    data-name="Form"
                    data-bs-original-title=""
                    title=""
                    aria-describedby="tooltip133213"
                  >
                    <div className="container"  style={{padding: 0 }}>
                      <form
                        action="/website/form/"
                        method="post"
                        enctype="multipart/form-data"
                        className="o_mark_required"
                        data-mark="*"
                        data-pre-fill="true"
                        data-success-mode="redirect"
                        data-success-page="/contactus-thank-you"
                        data-model_name="mail.mail"
                      >
                        <div className="s_website_form_rows row s_col_no_bgcolor">
                          <div
                            data-visibility-condition=""
                            data-visibility-between=""
                            className="s_website_form_field mb-3 col-12 s_website_form_model_required"
                            data-type="char"
                            data-name="Field"
                          >
                            <label
                              className="s_website_form_label"
                              style={{ width: "200px" }}
                              for="ozwlfl8un0y8"
                            >
                              <span className="s_website_form_label_content">
                                Dịch vụ yêu cầu
                              </span>
                              <span className="s_website_form_mark"> *</span>
                            </label>
                            <input
                              type="text"
                              className="form-control s_website_form_input"
                              name="subject"
                              required="true"
                              value=""
                              id="ozwlfl8un0y8"
                              data-fill-with="undefined"
                              placeholder='Ví dụ: "Giặt hấp Áo Vest"'
                            />
                          </div>
                          <div
                            data-visibility-condition=""
                            data-visibility-between=""
                            className="s_website_form_field mb-3 col-12 s_website_form_custom s_website_form_required"
                            data-type="datetime"
                            data-name="Field"
                          >
                            <label
                              className="s_website_form_label"
                              style={{ width: "200px" }}
                              for="o2qat54arydk"
                            >
                              <span className="s_website_form_label_content">
                                Lịch hẹn (Pick-up)
                              </span>
                              <span className="s_website_form_mark"> *</span>
                            </label>
                            <div
                              className="s_website_form_datetime input-group date s_website_form_datepicker_initialized"
                              id="datetimepicker8276644101502255"
                              data-target-input="nearest"
                            >
                              <input
                                type="text"
                                className="form-control datetimepicker-input s_website_form_input"
                                data-target="#datetimepicker8276644101502255"
                                name="Lịch hẹn (Pick-up)"
                                required="1"
                                id="o2qat54arydk"
                                data-fill-with="undefined"
                                placeholder="Đặt thời gian lấy đồ tại nhà với 247"
                              />
                              <div
                                className="input-group-text"
                                data-target="#datetimepicker8276644101502255"
                                data-toggle="datetimepicker"
                              >
                                <i className="fa fa-calendar"></i>
                              </div>
                            </div>
                          </div>
                          <div
                            data-visibility-condition=""
                            data-visibility-between=""
                            className="s_website_form_field mb-3 col-12 s_website_form_custom s_website_form_required"
                            data-type="char"
                            data-name="Field"
                          >
                            <label
                              className="s_website_form_label "
                              style={{ width: "200px" }}
                              for="oq9h8f2v4wcj"
                            >
                              <span className="s_website_form_label_content">
                                Họ tên của bạn
                              </span>
                              <span className="s_website_form_mark"> *</span>
                            </label>
                            <input
                              type="text"
                              className="form-control s_website_form_input"
                              name="Họ tên của bạn"
                              required="1"
                              placeholder=""
                              id="oq9h8f2v4wcj"
                              data-fill-with="name"
                            />
                          </div>
                          <div
                            data-visibility-condition=""
                            data-visibility-between=""
                            className="s_website_form_field mb-3 col-12 s_website_form_custom s_website_form_required"
                            data-type="tel"
                            data-name="Field"
                          >
                            <label
                              className="s_website_form_label "
                              style={{ width: "200px" }}
                              for="o8xo82yykgjo"
                            >
                              <span className="s_website_form_label_content">
                                Điện thoại của bạn
                              </span>
                              <span className="s_website_form_mark"> *</span>
                            </label>
                            <input
                              type="tel"
                              className="form-control s_website_form_input"
                              name="Điện thoại của bạn"
                              required="1"
                              placeholder=""
                              id="o8xo82yykgjo"
                              data-fill-with="phone"
                            />
                            <div className="s_website_form_field_description small form-text text-muted">
                              Chờ chút nhé! Chúng tôi sẽ gọi cho bạn để xác nhận
                              yêu cầu dịch vụ
                            </div>
                          </div>
                          <div
                            data-visibility-condition=""
                            data-visibility-between=""
                            className="s_website_form_field mb-3 col-12 s_website_form_model_required"
                            data-type="char"
                            data-name="Field"
                          >
                            <label
                              className="s_website_form_label "
                              style={{ width: "200px" }}
                              for="oqw5pcc5u2xd"
                            >
                              <span className="s_website_form_label_content">
                                Email của bạn
                              </span>
                              <span className="s_website_form_mark"> *</span>
                            </label>
                            <input
                              type="text"
                              className="form-control s_website_form_input"
                              name="email_from"
                              required="true"
                              placeholder=""
                              id="oqw5pcc5u2xd"
                              data-fill-with="email"
                            />
                            <div className="s_website_form_field_description small form-text text-muted">
                              Chúng tôi sẽ gửi chứng từ hoặc hóa đơn giặt ủi cho
                              bạn (Nếu có)
                            </div>
                          </div>
                          <div
                            data-visibility-condition=""
                            data-visibility-between=""
                            className="s_website_form_field mb-3 col-12 s_website_form_custom s_website_form_required"
                            data-type="char"
                            data-name="Field"
                          >
                            <label
                              className="s_website_form_label "
                              style={{ width: "200px" }}
                              for="oua3cze362c"
                            >
                              <span className="s_website_form_label_content">
                                Địa chỉ của bạn
                              </span>
                              <span className="s_website_form_mark"> *</span>
                            </label>
                            <input
                              type="text"
                              className="form-control s_website_form_input"
                              name="Địa chỉ của bạn"
                              required="1"
                              value=""
                              placeholder=""
                              id="oua3cze362c"
                              data-fill-with="commercial_company_name"
                            />
                            <div className="s_website_form_field_description small form-text text-muted">
                              Tùy từng khu vực mà 247 mới có thể cung cấp dịch
                              vụ
                            </div>
                          </div>
                          <div
                            className="s_website_form_field mb-3 col-12    s_website_form_dnone"
                            data-name="Field"
                          >
                            <div className="row s_col_no_resize s_col_no_bgcolor">
                              <label
                                className="col-form-label col-sm-auto s_website_form_label "
                                style={{ width: "200px" }}
                              >
                                <span className="s_website_form_label_content"></span>
                              </label>
                              <div className="col-sm">
                                <input
                                  type="hidden"
                                  className="form-control s_website_form_input"
                                  name="email_to"
                                  value="giatui247.vn@gmail.com"
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className="mb-0 py-2 col-12 s_website_form_submit text-center s_website_form_no_submit_label"
                            data-name="Submit Button"
                            data-bs-original-title=""
                            title=""
                            aria-describedby="tooltip991261"
                          >
                            <div
                              style={{ width: "200px" }}
                              className="s_website_form_label"
                            ></div>
                            <button className="btn btn-primary">
                              Gửi cho LBS
                            </button>
                            <span id="s_website_form_result"></span>
                          </div>
                        </div>
                      </form>
                    </div>
                  </section>
                  <p>
                    <br />
                  </p>
                </div>
                <div className="col-lg-6 pt16 pb16 o_colored_level">
                  <img
                    src="https://giatui247.vn/web_editor/shape/illustration/online-shopping-svg-594?c1=%23637BBE&unique=ea83d576"
                    className="img img-fluid mx-auto o_we_custom_image"
                    style={{ padding: "32px !important" }}
                    data-original-id="594"
                    data-original-src="/web_editor/shape/illustration/online-shopping-svg-594?c1=%23637BBE&amp;unique=ea83d576"
                    data-mimetype="image/svg+xml"
                    data-resize-width="undefined"
                    data-bs-original-title=""
                    title="Đặt dịch vụ giặt ủi - giặt sấy - giặt hấp online ngay tại nhà"
                    aria-describedby="tooltip700625"
                    loading="lazy"
                    alt="Đặt dịch vụ giặt ủi - giặt sấy - giặt hấp online ngay tại nhà"
                  />
                  <br />
                  <em>
                    <span style={{ fontSize: "12px" }}>
                      "Nhanh hơn tiện lợi hơn - thảnh thơi nghỉ ngơi, Ngay tại
                      nhà đặt dịch vụ giặt ủi - giặt sấy - giặt hấp dễ dàng và
                      nhanh nhất!, 247 sẽ giao nhận tận cửa nhà bạn theo lịch đã
                      định sẵn."
                    </span>
                  </em>
                  <br />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div style={{marginTop: 100}}>
        <Footer />
      </div>
    </>
  );
}

export default BookingDemo;
