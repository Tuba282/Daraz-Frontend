import React from 'react';

export const getDynamicDescription = (product) => {
  const title = product.title.toLowerCase();

  // EARBUDS / HEADPHONES TEMPLATE
  if (title.includes('earbud') || title.includes('headphone')) {
    return (
      <div className="text-sm text-gray-600 leading-loose space-y-8">
        <section>
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Product Overview</h3>
          <p className="mb-3">
            Experience next-generation quality with our <strong>{product.title}</strong>, designed to provide exceptional performance, reliable connectivity, and all-day comfort. Whether you're using it for business, entertainment, exercising, or traveling, this product delivers crystal-clear results and seamless operation.
          </p>
          <p className="mb-3">
            Featuring the latest <strong>Bluetooth 5.3</strong> technology, it ensures faster pairing, lower power consumption, minimal latency, and a stable wireless connection up to <strong>10 meters (33 feet)</strong>. The ergonomic design provides a secure and comfortable fit, making it suitable for long sessions without discomfort.
          </p>
          <p className="mb-3">
            The high-capacity battery extends usage life, allowing you to enjoy uninterrupted performance throughout the day. Built-in smart controls let you manage playback, answer or reject calls, adjust volume, and switch tracks without touching your phone.
          </p>
          <p>
            With <strong>IPX5 water resistance</strong>, it is protected against sweat and light rain, making it an ideal companion for workouts, jogging, cycling, hiking, and outdoor activities.
          </p>
        </section>

        <hr className="border-gray-200" />

        <section>
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Key Features</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Latest Bluetooth 5.3 Technology for fast, stable, and energy-efficient connectivity</li>
            <li>High-Fidelity (Hi-Fi) Stereo Sound with enhanced bass and balanced audio</li>
            <li>Environmental Noise Cancellation (ENC) for clearer voice calls</li>
            <li>Smart Touch Controls for music, calls, volume, and voice assistant</li>
            <li>Automatic Pairing and Instant Connection after the first setup</li>
            <li>IPX5 Water & Sweat Resistance</li>
            <li>Long Battery Life with portable charging case</li>
            <li>Universal compatibility with iOS, Android, and Windows</li>
          </ul>
        </section>
      </div>
    );
  }

  // SMART WATCH TEMPLATE
  if (title.includes('watch')) {
    return (
      <div className="text-sm text-gray-600 leading-loose space-y-8">
        <section>
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Product Overview</h3>
          <p className="mb-3">
            Stay connected and track your fitness goals with the <strong>{product.title}</strong>. Designed with a sleek, modern aesthetic and a vibrant HD display, this smartwatch seamlessly blends style with advanced technology. Keep track of your health, receive instant notifications, and look great doing it.
          </p>
          <p className="mb-3">
            Equipped with state-of-the-art health monitoring sensors, this watch accurately tracks your heart rate, blood oxygen levels, and sleep patterns. Whether you are running a marathon or sitting in a meeting, it provides real-time insights to help you maintain a healthy lifestyle.
          </p>
          <p>
            The watch features an extended battery life that lasts up to 7 days on a single charge, ensuring you spend less time charging and more time moving. It is also completely water-resistant, making it perfect for swimming and intense workouts.
          </p>
        </section>

        <hr className="border-gray-200" />

        <section>
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Key Features</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Vibrant HD Touch Screen with customizable watch faces</li>
            <li>24/7 Heart Rate and Blood Oxygen (SpO2) monitoring</li>
            <li>Advanced Sleep Tracking and personalized health insights</li>
            <li>Multiple Sports Modes for accurate workout tracking</li>
            <li>Smart Notifications for calls, texts, and social media</li>
            <li>Up to 7 Days of battery life with fast magnetic charging</li>
            <li>IP68 Water and Dust Resistance</li>
            <li>Seamless Bluetooth synchronization with iOS and Android devices</li>
          </ul>
        </section>
      </div>
    );
  }

  // KEYBOARD / MOUSE TEMPLATE
  if (title.includes('keyboard') || title.includes('mouse')) {
    return (
      <div className="text-sm text-gray-600 leading-loose space-y-8">
        <section>
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Product Overview</h3>
          <p className="mb-3">
            Elevate your setup with the <strong>{product.title}</strong>, engineered for ultimate precision, comfort, and speed. Whether you are a professional gamer, a programmer, or an office worker, this peripheral delivers unmatched responsiveness and tactile satisfaction.
          </p>
          <p className="mb-3">
            Constructed with premium materials, it guarantees durability even under heavy, continuous use. The ergonomic design ensures that your hands remain comfortable, reducing strain during long hours of gaming or typing. 
          </p>
          <p>
            Experience lightning-fast response times and customize your workspace with vibrant RGB lighting options. Plug-and-play functionality means you can get started immediately without complex software installations.
          </p>
        </section>

        <hr className="border-gray-200" />

        <section>
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Key Features</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Ultra-responsive inputs with minimal latency</li>
            <li>Ergonomic design crafted for long-term comfort and reduced fatigue</li>
            <li>Customizable RGB lighting with multiple dynamic effects</li>
            <li>Premium build quality ensuring millions of clicks/keystrokes</li>
            <li>Plug-and-play USB/Wireless connectivity</li>
            <li>Compatible with Windows, macOS, and Linux</li>
          </ul>
        </section>
      </div>
    );
  }

  // GENERIC TEMPLATE FOR EVERYTHING ELSE
  return (
    <div className="text-sm text-gray-600 leading-loose space-y-8">
      <section>
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Product Overview</h3>
        <p className="mb-3">
          Discover the exceptional quality of the <strong>{product.title}</strong>, officially presented by <strong>{product.brand || product.seller?.name || 'Daraz Mall'}</strong>. Designed with a premium build and precision craftsmanship, this product is delivered in brand new condition to ensure optimal performance, durability, and a highly satisfying user experience.
        </p>
        <p className="mb-3">
          {product.description || 'This item is carefully crafted using high-quality materials to meet rigorous industry standards.'} It effortlessly combines modern aesthetics with robust functionality. It is specifically engineered to provide long-lasting resilience and everyday utility.
        </p>
        <p>
          Your purchase is entirely secure, protected by a comprehensive warranty and backed by a hassle-free return policy for complete peace of mind. Experience unparalleled convenience with our express delivery service, ensuring your <strong>{product.title}</strong> arrives promptly and safely at your doorstep.
        </p>
      </section>

      <hr className="border-gray-200" />

      <section>
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Key Features</h3>
        <ul className="list-disc pl-6 space-y-2">
          {product.highlights ? (
            product.highlights.map((highlight, idx) => (
              <li key={idx}>{highlight}</li>
            ))
          ) : (
            <>
              <li>Premium build quality with durable materials</li>
              <li>Modern, aesthetically pleasing design</li>
              <li>Highly reliable and rigorously tested for performance</li>
              <li>100% genuine product directly from the manufacturer</li>
              <li>Fast and secure shipping straight to your door</li>
            </>
          )}
        </ul>
      </section>
    </div>
  );
};
