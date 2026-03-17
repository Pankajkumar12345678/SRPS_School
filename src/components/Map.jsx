const Map = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-8">
          Our Location
        </h2>
        <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3497.857810345698!2d76.267324315086!3d28.752928982372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3912f9b9b9b9b9b9%3A0x123456789abcdef!2sShree%20Ram%20Public%20School%2C%20Kanhra!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="School Location"
          ></iframe>
        </div>
        <p className="text-center mt-4 text-gray-600">
          Shree Ram Public School, Kanhra-Badhra Road, Charkhi Dadri, Haryana
          127306
        </p>
      </div>
    </section>
  );
};

export default Map;
