import { useNavigate } from "react-router";
import { styled } from "styled-components";
import DefaultLayout from "../layouts/DefaultLayout";
import { Formik } from "formik";
import Image from "../components/Image";
import text from "../assets/images/text.png";
import * as Yup from "yup";
import { regist } from "../services/Regist";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
`;

const Input = styled.input`
  display: flex;
  flex-direction: column;
  height: 40px;
  width: 300px;
  border: none;
`;

const InputErrorLabel = styled.label`
  color: red;
  font-size: 12px;
`;

const SubmitButton = styled.button`
  height: 40px;
  width: 300px;
  border: none;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  margin-bottom: 20px;
`;

const Header = styled.h1`
  @import url("https://fonts.cdnfonts.com/css/counter-strike");
  color: white;
  font-size: 64px;
  margin-left: 2%;
  margin-bottom: 5%;
  margin-top: 20%;
  font-family: "Counter-Strike";
  font-weight: 500;
  word-wrap: break-word;
`;

const Paragrafo = styled.p`
  margin-top: 6%;
  color: white;
  font-size: 30px;
  margin-bottom: 2%;
  font-family: "Counter-Strike";
  font-weight: 500;
  word-wrap: break-word;
  text-decoration: underline;
`;

const Anchor = styled.a`
  text-decoration: none;
  color: white;
`;

export default function Regist() {
  const navigate = useNavigate();
  return (
    <DefaultLayout>
      <Container>
        <Image source={text} style={{ marginTop: "20%" }}></Image>
        <Header>Registo</Header>
        <Formik
          initialValues={{
            username: "",
            email: "",
            firstName: "",
            lastName: "",
            password: "",
          }}
          validationSchema={Yup.object({
            username: Yup.string().required("Username is required"),
            email: Yup.string().required("Email is required"),
            firstName: Yup.string().required("First name is required"),
            lastName: Yup.string().required("Last name is required"),
            password: Yup.string().required("Password is required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            const response = await regist(
              values.username,
              values.email,
              values.firstName,
              values.lastName,
              values.password
            );
            if (response === 200) {
              navigate("/login");
            } else {
              // TODO: Show a error message
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <InputContainer>
                <Input
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
                <InputErrorLabel>
                  {errors.username && touched.username && errors.username}
                </InputErrorLabel>
              </InputContainer>
              <InputContainer>
                <Input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <InputErrorLabel>
                  {errors.email && touched.email && errors.email}
                </InputErrorLabel>
              </InputContainer>
              <InputContainer>
                <Input
                  type="text"
                  placeholder="First name"
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <InputErrorLabel>
                  {errors.firstName && touched.firstName && errors.firstName}
                </InputErrorLabel>
              </InputContainer>
              <InputContainer>
                <Input
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <InputErrorLabel>
                  {errors.lastName && touched.lastName && errors.lastName}
                </InputErrorLabel>
              </InputContainer>
              <InputContainer>
                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <InputErrorLabel>
                  {errors.password && touched.password && errors.password}
                </InputErrorLabel>
              </InputContainer>
              <SubmitButton type="submit" disabled={isSubmitting}>
                REGISTAR
              </SubmitButton>
            </form>
          )}
        </Formik>
        <Paragrafo>
          <Anchor href="">Fazer Login</Anchor>
        </Paragrafo>
      </Container>
    </DefaultLayout>
  );
}
