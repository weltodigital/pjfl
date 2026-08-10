import { Link } from "react-router-dom";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const NotFound = () => (
  <div className="flex min-h-screen flex-col bg-[#fcfef1]">
    <Navbar />
    <main className="container flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-6xl font-bold text-[#bc1823]">404</p>
      <h1 className="mt-4 text-3xl font-bold text-[#345e7d]">Page not found</h1>
      <p className="mt-3 max-w-md text-gray-600">
        Sorry, we couldn't find the page you were looking for.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/contact">Contact Us</Link>
        </Button>
      </div>
    </main>
    <Footer />
  </div>
);

export default NotFound;
