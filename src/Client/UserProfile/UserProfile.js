import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { getDetaiUser, updateUser } from "../../Service/userAPI";
import { ToastContainer, toast } from "react-toastify";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [role, setRole] = useState();
  const [avatar, setAvatar] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const userId = JSON.parse(localStorage.getItem("userId"));
  useEffect(() => {
    const handleUserProfile = async () => {
      try {
        const userDetail = await getDetaiUser(userId);
        setUser(userDetail);
        setFirstName(userDetail[0].first_name);
        setLastName(userDetail[0].last_name);
        setUserName(userDetail[0].username);
        setEmail(userDetail[0].email);
        setAddress(userDetail[0].address_user);
        setPhoneNumber(userDetail[0].phone_number);
        setAvatar(userDetail[0].avatar);
        setRole(userDetail[0].role);
      } catch (error) {
        toast.error(error.response.data.error);
      }
    };
    handleUserProfile();
  }, []);

  const handleEdit = async () => {
    const data = {
      id: userId,
      username: userName,
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName,
      role: role,
      avatar: avatar === null || avatar === "" ? user[0].avatar : avatar,
      address_user: address,
      phone_number: phoneNumber,
      created_at: user[0].created_at,
      updated_at: new Date(),
      created_by_id: userId,
      updated_by_id: userId,
    };
    try {
      if (password === "" && confirmPassword !== "") {
        toast.error("The  password field is mandatory");
      } else if (password !== "" && confirmPassword === "") {
        toast.error("The confirm password field is mandatory");
      } else {
        await updateUser(data);
        toast.success(`Update account information Success!`);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div>
      <Header />
      <Container className="mt-4">
        {user ? (
          <>
            <Row>
              <Col md={3}>
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
                    src={
                      avatar === null || avatar === ""
                        ? user[0].avatar === null || user[0].avatar === ""
                          ? "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
                          : user[0].avatar
                        : avatar
                    }
                    roundedCircle
                  />
                </div>
                <Form.Group className="mb-3">
                  <Form.Label>Avatar</Form.Label>
                  <Form.Control
                    type="text"
                    name="avatar"
                    onChange={(e) => {
                      setAvatar(e.target.value);
                    }}
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
                        Value={user[0].first_name}
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
                        Value={user[0].last_name}
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
                      disabled
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
                      disabled
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
                      value={user[0].address_user}
                      onChange={(e) => setAddress(e.target.value)}
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
                      value={user[0].phone_number}
                      onChange={(e) => setPhoneNumber(e.target.value)}
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
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" control Id="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      name="confirmPassword"
                      default
                      // value={}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                      onClick={handleEdit}
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
