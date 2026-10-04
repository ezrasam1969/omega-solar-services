import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  systemCapacities,
  projectTypes,
  panelTypes,
  inverterTypes,
  acWiringOptions,
  dcCableOptions,
  earthingWireOptions,
  acdbDcdbOptions,
  structureOptions,
  earthingOptions,
  lightningProtectionOptions,
} from "../../data/products";

import { calculateClosingPrice } from "../../lib/calculations";
import { downloadBlob, generatePurchaseOrderPdf } from "../../lib/pdf";
import { BROCHURE_URL } from "../../lib/brochure";
import "./OwnerPO.css";
import InstallAppButton from "./InstallAppButton";

const today = new Date().toISOString().split("T")[0];

const initialQuotation = {
  quotationNumber: "420",
  proposalDate: today,

  customer: {
    name: "",
    mobile: "",
    location: "",
    pincode: "",
  },

  system: {
    capacity: "",
    projectType: "Rooftop Solar – On-Grid",
  },

  technical: {
    panelType: "",
    inverterType: "",
    acWiring: "",
    dcCable: "",
    earthingWire: "",
    acdbDcdb: "",
    structure: "",
    earthing: "",
    lightningProtection: "",
    civilWorks: "Civil works as per site requirement",
  },

  scope: {
    installation: true,
    civilWorks: true,
    netMetering: true,
    subsidySupport: true,
    testingCommissioning: true,
  },

  pricing: {
    actualProjectCost: 0,
    subsidy: 0,
    discount: 0,
    closingPrice: 0,
  },

  warranty: {
    panel: "25 Years Panel Warranty",
    wiring: "30 Years Wiring Warranty",
    structure: "30 Years Structure Warranty",
    inverter: "10 Years Inverter Warranty",
    freeService: "5 Years Free Service",
  },

  paymentTerms: {
    designing: 5,
    structureWiring: 25,
    modules: 65,
    netMeterCompletion: 5,
  },
};

export default function PurchaseOrder() {
  const navigate = useNavigate();

  const [quotation, setQuotation] = useState(initialQuotation);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const closingPrice = useMemo(
    () =>
      calculateClosingPrice(
        quotation.pricing.actualProjectCost,
        quotation.pricing.subsidy,
        quotation.pricing.discount,
      ),
    [quotation.pricing],
  );

  const previewQuotation = {
    ...quotation,
    pricing: {
      ...quotation.pricing,
      closingPrice,
    },
  };

  function updateCustomer(field, value) {
    setQuotation((q) => ({
      ...q,
      customer: {
        ...q.customer,
        [field]: value,
      },
    }));
  }

  function updateSystem(field, value) {
    setQuotation((q) => ({
      ...q,
      system: {
        ...q.system,
        [field]: value,
      },
    }));
  }

  function updateTechnical(field, value) {
    setQuotation((q) => ({
      ...q,
      technical: {
        ...q.technical,
        [field]: value,
      },
    }));
  }

  function toggleScope(field) {
    setQuotation((q) => ({
      ...q,
      scope: {
        ...q.scope,
        [field]: !q.scope[field],
      },
    }));
  }

  function valid() {
    return (
      !!quotation.customer.name.trim() &&
      !!quotation.system.capacity &&
      quotation.pricing.actualProjectCost > 0
    );
  }

  async function downloadPO() {
    if (!valid()) {
      setMessage(
        "Please enter customer name, system capacity and actual project cost.",
      );
      return;
    }

    setBusy(true);
    setMessage("");

    try {
      const blob = await generatePurchaseOrderPdf(previewQuotation);

      downloadBlob(
        blob,
        `${previewQuotation.quotationNumber}-${previewQuotation.customer.name.replace(
          /[^a-z0-9]+/gi,
          "-",
        )}-Purchase-Order.pdf`,
      );

      setMessage("Purchase Order downloaded successfully.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Could not generate Purchase Order.",
      );
    } finally {
      setBusy(false);
    }
  }

  function logout() {
    sessionStorage.removeItem("omega_owner_authenticated");
    navigate("/owner/login", { replace: true });
  }

  const scopeItems = [
    ["installation", "Complete system installation"],
    ["civilWorks", "Civil works"],
    ["netMetering", "Net metering"],
    ["subsidySupport", "Subsidy support"],
    ["testingCommissioning", "Testing & commissioning"],
  ];

  return (
    <main className="owner-shell">
      <div className="owner-wrap">
        <header className="owner-header">
          <div>
            <div className="owner-kicker">OMEGA SOLAR POWER SYSTEMS</div>

            <h1>Purchase Order Automation</h1>

            <p>Build and download the exact Omega Solar Purchase Order.</p>
          </div>

          <div className="owner-header-actions">
            <InstallAppButton />
            <button className="secondary-btn" type="button" onClick={logout}>
              Logout
            </button>

            <div className="po-number">
              PO No. <b>{quotation.quotationNumber}</b>
            </div>
          </div>
        </header>

        <section className="card">
          <h2>1. Customer Details</h2>

          <div className="form-grid">
            <TextField
              label="Customer Name"
              value={quotation.customer.name}
              placeholder="Mr. Pranith"
              onChange={(v) => updateCustomer("name", v)}
            />

            <TextField
              label="Mobile Number"
              value={quotation.customer.mobile}
              placeholder="8978428057"
              type="tel"
              onChange={(v) => updateCustomer("mobile", v)}
            />

            <TextField
              label="Location / Address"
              value={quotation.customer.location}
              placeholder="Hyderabad Telangana 500026"
              onChange={(v) => updateCustomer("location", v)}
            />

            <TextField
              label="PIN Code"
              value={quotation.customer.pincode}
              placeholder="500026"
              inputMode="numeric"
              onChange={(v) => updateCustomer("pincode", v)}
            />

            <TextField
              label="PO Date"
              value={quotation.proposalDate}
              type="date"
              onChange={(v) =>
                setQuotation((q) => ({
                  ...q,
                  proposalDate: v,
                }))
              }
            />

            <TextField
              label="PO Number"
              value={quotation.quotationNumber}
              placeholder="420"
              onChange={(v) =>
                setQuotation((q) => ({
                  ...q,
                  quotationNumber: v,
                }))
              }
            />
          </div>
        </section>

        <section className="card">
          <h2>2. System &amp; Material Specifications</h2>

          <div className="form-grid">
            <SelectField
              label="System Capacity"
              value={quotation.system.capacity}
              options={systemCapacities}
              onChange={(v) => updateSystem("capacity", v)}
            />

            <SelectField
              label="Project Type"
              value={quotation.system.projectType}
              options={projectTypes}
              onChange={(v) => updateSystem("projectType", v)}
            />

            <SelectField
              label="Solar PV Modules"
              value={quotation.technical.panelType}
              options={panelTypes}
              onChange={(v) => updateTechnical("panelType", v)}
            />

            <SelectField
              label="Solar Inverter"
              value={quotation.technical.inverterType}
              options={inverterTypes}
              onChange={(v) => updateTechnical("inverterType", v)}
            />

            <SelectField
              label="AC Wiring"
              value={quotation.technical.acWiring}
              options={acWiringOptions}
              onChange={(v) => updateTechnical("acWiring", v)}
            />

            <SelectField
              label="Earthing Wire"
              value={quotation.technical.earthingWire}
              options={earthingWireOptions}
              onChange={(v) => updateTechnical("earthingWire", v)}
            />

            <SelectField
              label="DC Cable"
              value={quotation.technical.dcCable}
              options={dcCableOptions}
              onChange={(v) => updateTechnical("dcCable", v)}
            />

            <SelectField
              label="ACDB / DCDB"
              value={quotation.technical.acdbDcdb}
              options={acdbDcdbOptions}
              onChange={(v) => updateTechnical("acdbDcdb", v)}
            />

            <SelectField
              label="Earthing"
              value={quotation.technical.earthing}
              options={earthingOptions}
              onChange={(v) => updateTechnical("earthing", v)}
            />

            <SelectField
              label="Lightning Protection"
              value={quotation.technical.lightningProtection}
              options={lightningProtectionOptions}
              onChange={(v) => updateTechnical("lightningProtection", v)}
            />

            <SelectField
              label="Module Mounting Structure"
              value={quotation.technical.structure}
              options={structureOptions}
              onChange={(v) => updateTechnical("structure", v)}
            />
          </div>
        </section>

        <section className="card">
          <h2>3. Company Scope of Work</h2>

          <div className="scope-grid">
            {scopeItems.map(([key, label]) => (
              <label className="check-row" key={key}>
                <input
                  type="checkbox"
                  checked={quotation.scope[key]}
                  onChange={() => toggleScope(key)}
                />

                <span>{label}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="card">
          <h2>4. Pricing</h2>

          <div className="form-grid pricing-grid">
            <NumberField
              label="Actual Project Cost"
              value={quotation.pricing.actualProjectCost}
              onChange={(v) =>
                setQuotation((q) => ({
                  ...q,
                  pricing: {
                    ...q.pricing,
                    actualProjectCost: v,
                  },
                }))
              }
            />

            <NumberField
              label="Subsidy"
              value={quotation.pricing.subsidy}
              onChange={(v) =>
                setQuotation((q) => ({
                  ...q,
                  pricing: {
                    ...q.pricing,
                    subsidy: v,
                  },
                }))
              }
            />

            <NumberField
              label="Discount (Optional)"
              value={quotation.pricing.discount}
              onChange={(v) =>
                setQuotation((q) => ({
                  ...q,
                  pricing: {
                    ...q.pricing,
                    discount: v,
                  },
                }))
              }
            />

            <div className="closing-box">
              <span>Closing Price</span>

              <strong>₹{closingPrice.toLocaleString("en-IN")}</strong>
            </div>
          </div>
        </section>

        <section className="card action-card">
          <h2>5. Finalize Purchase Order</h2>

          <div className="action-grid">
            <button
              className="primary-btn"
              disabled={busy}
              onClick={downloadPO}
              type="button"
            >
              {busy ? "Generating..." : "Download Purchase Order"}
            </button>

            <a
              className="secondary-btn brochure-action"
              href={BROCHURE_URL}
              target="_blank"
              rel="noreferrer"
            >
              View Solar Brochure ↗
            </a>
          </div>

          {message && <p className="message">{message}</p>}
        </section>
      </div>
    </main>
  );
}

function TextField({
  label,
  value,
  placeholder,
  type = "text",
  inputMode,
  onChange,
}) {
  return (
    <div>
      <label className="field-label">{label}</label>

      <input
        className="field"
        type={type}
        inputMode={inputMode}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function SelectField({ label, value, options, onChange }) {
  return (
    <div>
      <label className="field-label">{label}</label>

      <select
        className="field"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select {label}</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function NumberField({ label, value, onChange }) {
  return (
    <div>
      <label className="field-label">{label}</label>

      <input
        className="field"
        type="number"
        min="0"
        value={value || ""}
        placeholder="₹ 0"
        onChange={(e) => onChange(Number(e.target.value) || 0)}
      />
    </div>
  );
}
