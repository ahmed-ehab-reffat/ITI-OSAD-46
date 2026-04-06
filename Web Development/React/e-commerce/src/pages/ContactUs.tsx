import {useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import PhoneInput, {isValidPhoneNumber} from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import {CheckCircle2} from 'lucide-react';

const ContactUsSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  phone: Yup.string().test(
    'is-valid-phone',
    'Invalid phone number',
    (value) => {
      if (!value) return true;
      return isValidPhoneNumber(value);
    }
  ),
  message: Yup.string()
    .min(10, 'Message must be at least 10 characters')
    .max(500, 'Message cannot exceed 500 characters')
    .required('Message is required')
});

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      message: ''
    },
    validationSchema: ContactUsSchema,
    onSubmit: (_, {resetForm}) => {
      setSubmitted(true);
      resetForm();
    }
  });

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 flex justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl">
        <h2 className="text-3xl font-black text-purple-600 mb-8 text-center">
          Contact Us
        </h2>

        {submitted && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl flex items-center gap-3 mb-6">
            <CheckCircle2 size={24} className="text-emerald-500" />
            <span className="font-bold">
              Thank you! We will get back to you soon.
            </span>
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                className={`w-full p-3 border rounded-xl outline-none focus:border-purple-500 bg-gray-50 focus:bg-white transition ${formik.touched.firstName && formik.errors.firstName ? 'border-red-500' : 'border-gray-200'}`}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.firstName}
                </div>
              ) : null}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                className={`w-full p-3 border rounded-xl outline-none focus:border-purple-500 bg-gray-50 focus:bg-white transition ${formik.touched.lastName && formik.errors.lastName ? 'border-red-500' : 'border-gray-200'}`}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.lastName}
                </div>
              ) : null}
            </div>
          </div>

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
              Phone Number (Optional)
            </label>
            <PhoneInput
              international
              defaultCountry="EG"
              value={formik.values.phone}
              onChange={(value) => formik.setFieldValue('phone', value || '')}
              onBlur={() => formik.setFieldTouched('phone', true)}
              className={`w-full p-3 border rounded-xl outline-none focus-within:border-purple-500 bg-gray-50 focus-within:bg-white transition [&_input]:bg-transparent [&_input]:outline-none ${formik.touched.phone && formik.errors.phone ? 'border-red-500' : 'border-gray-200'}`}
            />
            {formik.touched.phone &&
            formik.errors.phone &&
            typeof formik.errors.phone === 'string' ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.phone}
              </div>
            ) : null}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Message
            </label>
            <textarea
              name="message"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
              rows={5}
              className={`w-full p-3 border rounded-xl outline-none focus:border-purple-500 bg-gray-50 focus:bg-white transition resize-none ${formik.touched.message && formik.errors.message ? 'border-red-500' : 'border-gray-200'}`}
            />
            {formik.touched.message && formik.errors.message ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.message}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition shadow-lg mt-6"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
