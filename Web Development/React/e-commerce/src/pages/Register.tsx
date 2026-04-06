import {useNavigate} from 'react-router';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {login} from '../store/auth';

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  name: Yup.string().required('Name is required'),
  username: Yup.string()
    .matches(/^\S*$/, 'Username cannot contain spaces')
    .required('Username is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required')
});

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      username: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: RegisterSchema,
    validateOnMount: true,
    onSubmit: () => {
      dispatch(login());
      navigate('/products');
    }
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-black text-purple-600 mb-6 text-center">
          Register
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="text"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={`w-full p-3 border rounded-xl outline-none focus:border-purple-500 bg-gray-50 focus:bg-white transition ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-200'}`}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className={`w-full p-3 border rounded-xl outline-none focus:border-purple-500 bg-gray-50 focus:bg-white transition ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-200'}`}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.name}
              </div>
            ) : null}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              className={`w-full p-3 border rounded-xl outline-none focus:border-purple-500 bg-gray-50 focus:bg-white transition ${formik.touched.username && formik.errors.username ? 'border-red-500' : 'border-gray-200'}`}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.username}
              </div>
            ) : null}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`w-full p-3 border rounded-xl outline-none focus:border-purple-500 bg-gray-50 focus:bg-white transition ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-200'}`}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className={`w-full p-3 border rounded-xl outline-none focus:border-purple-500 bg-gray-50 focus:bg-white transition ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-gray-200'}`}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition shadow-lg mt-6"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
