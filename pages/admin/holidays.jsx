import { useEffect, useState } from "react";

export default function HolidaysPage() {
  const [holidays, setHolidays] = useState([]);

  const [form, setForm] = useState({
    date: "",
    title: "",
  });

  const [loading, setLoading] = useState(false);

  const fetchHolidays = async () => {
    try {
      const response = await fetch("/api/holidays");
      const data = await response.json();

      setHolidays(data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const response = await fetch("/api/holidays");
        const data = await response.json();

        if (!ignore) {
          setHolidays(data.data || []);
        }
      } catch (error) {
        console.error(error);
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("/api/holidays", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.error || "Failed to add holiday");
        return;
      }

      setForm({
        date: "",
        title: "",
      });

      await fetchHolidays();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const deleteHoliday = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this holiday?"
    );

    if (!confirmDelete) return;

    try {
      await fetch(`/api/holidays/${id}`, {
        method: "DELETE",
      });

      await fetchHolidays();
    } catch (error) {
      console.error(error);
      alert("Failed to delete holiday");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">

        <div className="col-lg-10">

          <h1 className="mb-4">
            Holiday Management
          </h1>

          <div className="card shadow-sm mb-4">
            <div className="card-body">

              <h5 className="mb-3">
                Add Public Holiday
              </h5>

              <form onSubmit={handleSubmit}>
                <div className="row">

                  <div className="col-md-4">
                    <input
                      type="date"
                      className="form-control"
                      value={form.date}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          date: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Holiday Name"
                      value={form.title}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          title: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="col-md-2">
                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      disabled={loading}
                    >
                      {loading
                        ? "Saving..."
                        : "Add"}
                    </button>
                  </div>

                </div>
              </form>

            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-body">

              <h5 className="mb-3">
                Public Holidays
              </h5>

              {holidays.length === 0 ? (
                <div className="alert alert-info mb-0">
                  No public holidays found.
                </div>
              ) : (
                <div className="table-responsive">

                  <table className="table table-hover align-middle">

                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Holiday Name</th>
                        <th width="120">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>

                      {holidays.map(
                        (holiday) => (
                          <tr
                            key={holiday._id}
                          >
                            <td>
                              {holiday.date}
                            </td>

                            <td>
                              {holiday.title}
                            </td>

                            <td>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                  deleteHoliday(
                                    holiday._id
                                  )
                                }
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        )
                      )}

                    </tbody>

                  </table>

                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}