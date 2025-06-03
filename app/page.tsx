import Image from "next/image";

export default function Home() {
  // Template variables that would be replaced dynamically
  const guestName = "Guest Name";
  const rsvpByDate = "Friday, 30 August 2024";
  const requesterEmail = "contact@example.com";
  const rsvpLink = "#";

  return (
    <div className="es-wrapper-color" style={{ backgroundColor: "#f6f6f6" }}>
      <div className="es-wrapper" style={{ width: "100%", padding: "0", margin: "0" }}>
        <table className="es-wrapper" width="100%" cellSpacing="0" cellPadding="0" style={{ borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td className="esd-email-paddings" valign="top">
                {/* Header Section */}
                <table cellPadding="0" cellSpacing="0" className="es-header" align="center" style={{ borderCollapse: "collapse", width: "100%", maxWidth: "640px", margin: "0 auto" }}>
                  <tbody>
                    <tr>
                      <td className="esd-stripe" align="center">
                        <table className="es-header-body" align="center" cellPadding="0" cellSpacing="0" width="640" style={{ backgroundColor: "#ffffff", borderCollapse: "collapse" }}>
                          <tbody>
                            <tr>
                              <td className="esd-structure" align="left">
                                <table width="100%" cellSpacing="0" cellPadding="0" style={{ borderCollapse: "collapse" }}>
                                  <tbody>
                                    <tr>
                                      <td className="esd-container-frame" width="640" valign="top" align="center">
                                        <table width="100%" cellSpacing="0" cellPadding="0" style={{ borderCollapse: "collapse" }}>
                                          <tbody>
                                            <tr>
                                              <td align="center" className="esd-block-image" style={{ fontSize: "0px" }}>
                                                <Image 
                                                  src="/invite-header.jpg" 
                                                  alt="Wedding Invitation Header" 
                                                  width={640} 
                                                  height={200}
                                                  style={{ display: "block", maxWidth: "100%" }}
                                                  priority
                                                />
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td className="esd-structure" align="left" style={{ backgroundColor: "#010101", padding: "40px 20px 25px" }}>
                                <table cellPadding="0" cellSpacing="0" width="100%" style={{ borderCollapse: "collapse" }}>
                                  <tbody>
                                    <tr>
                                      <td width="600" className="esd-container-frame" align="center" valign="top">
                                        <table cellPadding="0" cellSpacing="0" width="100%" style={{ borderCollapse: "collapse" }}>
                                          <tbody>
                                            <tr>
                                              <td align="center" className="esd-block-text">
                                                <p style={{ fontSize: "30px", color: "#ffffff", margin: "0" }}><strong>Dear {guestName}</strong></p>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Content Section */}
                <table className="es-content" cellSpacing="0" cellPadding="0" align="center" style={{ borderCollapse: "collapse", width: "100%", maxWidth: "640px", margin: "0 auto" }}>
                  <tbody>
                    <tr>
                      <td className="esd-stripe" align="center">
                        <table className="es-content-body" width="640" cellSpacing="0" cellPadding="0" align="center" style={{ backgroundColor: "#010101", borderCollapse: "collapse" }}>
                          <tbody>
                            <tr>
                              <td className="esd-structure" align="left" style={{ backgroundColor: "#010101", padding: "20px 30px" }}>
                                <table width="100%" cellSpacing="0" cellPadding="0" style={{ borderCollapse: "collapse" }}>
                                  <tbody>
                                    <tr>
                                      <td className="esd-container-frame" width="580" valign="top" align="center">
                                        <table width="100%" cellSpacing="0" cellPadding="0" style={{ borderCollapse: "collapse" }}>
                                          <tbody>
                                            <tr>
                                              <td align="center" className="esd-block-text">
                                                <p style={{ color: "#ffffff", fontSize: "22px", lineHeight: "150%", margin: "0" }}>
                                                  <strong>John and Jane</strong><br/>
                                                  <strong>are delighted to invite you to their</strong>
                                                </p>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td className="esd-structure" align="left" style={{ backgroundColor: "#010101", padding: "20px" }}>
                                <table cellPadding="0" cellSpacing="0" width="100%" style={{ borderCollapse: "collapse" }}>
                                  <tbody>
                                    <tr>
                                      <td width="600" className="esd-container-frame" align="center" valign="top">
                                        <table cellPadding="0" cellSpacing="0" width="100%" style={{ backgroundColor: "#010101", borderCollapse: "collapse" }}>
                                          <tbody>
                                            <tr>
                                              <td align="center" className="esd-block-text" style={{ backgroundColor: "#010101" }}>
                                                <p style={{ color: "#ffffff", fontSize: "30px", margin: "0" }}><strong>Wedding Celebration</strong></p>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td className="esd-structure" align="left" style={{ backgroundColor: "#010101", padding: "20px" }}>
                                <table cellPadding="0" cellSpacing="0" width="100%" style={{ borderCollapse: "collapse" }}>
                                  <tbody>
                                    <tr>
                                      <td width="600" className="esd-container-frame" align="center" valign="top">
                                        <table cellPadding="0" cellSpacing="0" width="100%" style={{ borderCollapse: "collapse" }}>
                                          <tbody>
                                            <tr>
                                              <td align="center" className="esd-block-text">
                                                <p style={{ color: "#ffffff", margin: "0" }}>
                                                  <span style={{ fontSize: "18px" }}><u><strong>Date</strong></u></span><br/>
                                                  <span style={{ fontSize: "16px" }}>Saturday, 28th September 2024</span>
                                                </p>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td className="esd-structure" align="left" style={{ backgroundColor: "#010101", padding: "20px" }}>
                                <table cellPadding="0" cellSpacing="0" width="100%" style={{ borderCollapse: "collapse" }}>
                                  <tbody>
                                    <tr>
                                      <td width="600" className="esd-container-frame" align="center" valign="top">
                                        <table cellPadding="0" cellSpacing="0" width="100%" style={{ borderCollapse: "collapse" }}>
                                          <tbody>
                                            <tr>
                                              <td align="center" className="esd-block-text">
                                                <p style={{ color: "#ffffff", lineHeight: "150%", fontSize: "16px", margin: "0" }}>
                                                  <span style={{ fontSize: "18px", lineHeight: "150%" }}><u><strong>Key Event Timings</strong></u></span><br/>
                                                  <b>Wedding Ceremony</b><br/>
                                                  Access from 12:00 pm<br/>
                                                  Ceremony Commences: 12:30 pm<br/>
                                                  Reception: 2:30 pm<br/>
                                                  <em>*Times may change</em>
                                                </p>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td className="esd-structure" align="left" style={{ backgroundColor: "#010101", padding: "20px" }}>
                                <table cellPadding="0" cellSpacing="0" width="100%" style={{ borderCollapse: "collapse" }}>
                                  <tbody>
                                    <tr>
                                      <td width="600" className="esd-container-frame" align="center" valign="top">
                                        <table cellPadding="0" cellSpacing="0" width="100%" style={{ borderCollapse: "collapse" }}>
                                          <tbody>
                                            <tr>
                                              <td align="center" className="esd-block-text">
                                                <p style={{ color: "#ffffff", fontSize: "18px", margin: "0" }}><u><strong>Where</strong></u></p>
                                                <p style={{ fontSize: "16px", color: "#ffffff", margin: "5px 0 0 0" }}><strong>Grand Wedding Hall</strong><br/>123 Wedding Avenue</p>
                                                <p style={{ fontSize: "16px", color: "#ffffff", margin: "5px 0 0 0" }}>Entrance Gate 1, Level 2</p>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td className="esd-structure" align="left" style={{ backgroundColor: "#010101", padding: "20px" }}>
                                <table cellPadding="0" cellSpacing="0" width="100%" style={{ borderCollapse: "collapse" }}>
                                  <tbody>
                                    <tr>
                                      <td width="600" className="esd-container-frame" align="center" valign="top">
                                        <table cellPadding="0" cellSpacing="0" width="100%" style={{ borderCollapse: "collapse" }}>
                                          <tbody>
                                            <tr>
                                              <td align="center" className="esd-block-text">
                                                <p style={{ color: "#ffffff", fontSize: "16px", margin: "0" }}>
                                                  <u><strong><span style={{ fontSize:"18px" }}>Dress Code</span></strong></u><br/>
                                                  Formal
                                                </p>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td className="esd-structure" align="left" style={{ backgroundColor: "#010101", padding: "20px" }}>
                                <table width="100%" cellSpacing="0" cellPadding="0" style={{ borderCollapse: "collapse" }}>
                                  <tbody>
                                    <tr>
                                      <td className="esd-container-frame" width="600" valign="top" align="center">
                                        <table width="100%" cellSpacing="0" cellPadding="0" style={{ borderCollapse: "collapse" }}>
                                          <tbody>
                                            <tr>
                                              <td align="center" className="esd-block-text">
                                                <p style={{ color: "#ffffff", fontSize: "15px", margin: "0" }}>
                                                  <strong>RSVP is essential by </strong>{rsvpByDate}<strong></strong><br/>
                                                  Attendance is by invitation only and non-transferable
                                                </p>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td className="esd-structure" align="left" style={{ backgroundColor: "#010101", padding: "30px 20px 25px" }}>
                                <table width="100%" cellSpacing="0" cellPadding="0" style={{ borderCollapse: "collapse" }}>
                                  <tbody>
                                    <tr>
                                      <td className="esd-container-frame" width="600" valign="top" align="center">
                                        <table width="100%" cellSpacing="0" cellPadding="0" style={{ borderCollapse: "collapse" }}>
                                          <tbody>
                                            <tr>
                                              <td align="center" className="esd-block-text">
                                                <p style={{ color: "#ffffff", fontSize: "15px", margin: "0" }}>If you have any questions, please contact</p>
                                                <p style={{ color: "#ffffff", margin: "5px 0 0 0" }}>
                                                  <a href={`mailto:${requesterEmail}`} target="_blank" rel="noopener noreferrer" style={{ color: "#ffffff", textDecoration: "none" }}>
                                                    {requesterEmail}
                                                  </a>
                                                </p>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td className="esd-structure" align="left" style={{ backgroundColor: "#010101", padding: "20px 20px 40px" }}>
                                <table cellPadding="0" cellSpacing="0" width="100%" style={{ borderCollapse: "collapse" }}>
                                  <tbody>
                                    <tr>
                                      <td width="600" className="esd-container-frame" align="center" valign="top">
                                        <table cellPadding="0" cellSpacing="0" width="100%" style={{ borderCollapse: "collapse" }}>
                                          <tbody>
                                            <tr>
                                              <td align="center" className="esd-block-button">
                                                <a 
                                                  href={rsvpLink} 
                                                  className="es-button" 
                                                  target="_blank" 
                                                  rel="noopener noreferrer"
                                                  style={{ 
                                                    backgroundColor: "#f10721", 
                                                    padding: "10px 20px", 
                                                    fontFamily: "verdana, geneva, sans-serif", 
                                                    fontSize: "20px", 
                                                    fontWeight: "bold",
                                                    color: "white",
                                                    textDecoration: "none",
                                                    display: "inline-block",
                                                    borderRadius: "4px"
                                                  }}
                                                >
                                                  CLICK HERE TO RSVP
                                                </a>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
