const Features = () => {
  return (
    <section className="bg-secondary/10 rounded-lg p-8 mb-16">
      <h2 className="text-3xl font-bold text-center mb-6">Why Choose FindMyInteriors?</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-3">Verified Providers</h3>
          <p>All our suppliers and service providers are thoroughly vetted and reviewed.</p>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-3">Free Consultation</h3>
          <p>Get free initial consultations with your chosen providers.</p>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-3">Local Expertise</h3>
          <p>Find providers who understand your local market and preferences.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;