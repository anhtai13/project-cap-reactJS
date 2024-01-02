import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { getDetaiUser } from "../../Service/userAPI";
import { ToastContainer, toast } from "react-toastify";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [isChanged, setIsChanged] = useState(false);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const userId = JSON.parse(localStorage.getItem("userId"));
  useEffect(() => {
    const handleUserProfile = async () => {
      try {
        const userDetail = await getDetaiUser(userId);
        setUser(userDetail);
        
      } catch (error) {
        toast.error(error.response.data.error);
      }
    };

    handleUserProfile();
  }, [isChanged]);



  
  return (
    <div>
      <Header />
      <Container className="mt-4">
        {user ? (
          <>
            <Row>
              <Col
                md={3}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    marginTop: 50,
                  }}
                >
                  <Image
                    style={{
                      width: 200,
                      height: 200,
                    }}
                    src={user[0].avatar}
                    roundedCircle
                  />
                </div>
                <Form.Group className="mb-3">
                  <Form.Label>Hình ảnh đại diện</Form.Label>
                  <Form.Control
                    type="text"
                    name="avatar"
                    // onChange={handleUploadImage}
                    multiple
                  />
                </Form.Group>
              </Col>
              <Col md={7}>
                <h2
                  style={{
                    textAlign: "center",
                    marginBottom: 30,
                  }}
                >
                  Thông tin tài khoản
                </h2>

                <Form>
                  <div
                    style={{
                      display: "flex",
                      gap: 20,
                    }}
                  >
                    <Form.Group className="mb-3 w-50" control Id="firstName">
                      <Form.Label className="ml-3">First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập tên"
                        name="firstName"
                        default
                        Value={user[0].firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 w-50" control Id="lastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập họ"
                        name="lastName"
                        default
                        Value={user[0].lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </div>
                  <Form.Group className="mb-3" control Id="username">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập email"
                      name="username"
                      default
                      value={user[0].username}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" control Id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Nhập email"
                      name="email"
                      default
                      value={user[0].email}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" control Id="address">
                    <Form.Label>Địa chỉ</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập địa chỉ"
                      name="address"
                      default
                      value={user[0].address}
                      // onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" control Id="phone">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập số điện thoại"
                      name="phoneNumber"
                      default
                      value={user[0].phoneNumber}
                      // onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" control Id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      name="password"
                      default
                      // value={}
                      // onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" control Id="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập số điện thoại"
                      name="confirmPassword"
                      default
                      // value={}
                      // onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <div style={{ display: "flex", marginTop: 30 }}>
                    <Button
                      variant="primary"
                      //   type="submit"
                      style={{
                        width: 150,
                      }}
                      // onClick={handleUpdate}
                    >
                      Xác nhận
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </>
        ) : (
          <div>loading API</div>
        )}
        <ToastContainer />
      </Container>
    </div>
  );
}

export default UserProfile;
