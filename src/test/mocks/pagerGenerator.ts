import { PagerEvent } from "../../pager-service/persistance/entities/types";

export const PagerlevelZeroUnhealthy: PagerEvent = {
  alert: {
    serviceId: "service123",
    message: "***Something really bad happened***",
    status: "unhealthy",
    id: "2cf959e7-928a-49a2-8c5e-76c400b9f34f"
  },
  ep: {
    id: "1234",
    serviceId: "service123",
    levels: [
      {
        target: { email: ["pepon@pepon.com", "cto@pepon.com"] }
      },
      {
        target: {
          email: ["cto@pepon.com", "bigboss@pepon.com"],
          sms: ["+1212345890"]
        }
      },
      {
        target: {
          email: ["joebiden@pepon.com", "pentagon@pepon.com"],
          sms: ["+1212345337"]
        }
      }
    ]
  },
  alertLevel: 0,
  date: new Date("2021-10-16T16:23:05.276Z"),
  delay: 900000,
  acknowledged: false
};

export const PagerlevelOneUnhealthy: PagerEvent = {
  alert: {
    serviceId: "service1",
    message: "***Something really bad bad happened***",
    status: "unhealthy",
    id: "2cf959e7-928a-49a2-8c5e-76c400b9f34f"
  },
  ep: {
    id: "1234",
    serviceId: "service1",
    levels: [
      {
        target: { email: ["pepon@pepon.com", "cto@pepon.com"] }
      },
      {
        target: {
          email: ["cto@pepon.com", "bigboss@pepon.com"],
          sms: ["+1212345890"]
        }
      },
      {
        target: {
          email: ["joebiden@pepon.com", "pentagon@pepon.com"],
          sms: ["+1212345333"]
        }
      }
    ]
  },
  alertLevel: 1,
  date: new Date("2021-10-16T16:23:05.276Z"),
  delay: 900000,
  acknowledged: false
};

export const PagerlevelOneHealthy: PagerEvent = {
  alert: {
    serviceId: "service1",
    message: "***Something really bad happened***",
    status: "healthy",
    id: "2cf959e7-928a-49a2-8c5e-76c400b9f34f"
  },
  ep: {
    id: "1234",
    serviceId: "service1",
    levels: [
      {
        target: { email: ["pepon@pepon.com", "cto@pepon.com"] }
      },
      {
        target: {
          email: ["cto@pepon.com", "bigboss@pepon.com"],
          sms: ["+1212345890"]
        }
      },
      {
        target: {
          email: ["joebiden@pepon.com", "pentagon@pepon.com"],
          sms: ["+1212345333"]
        }
      }
    ]
  },
  alertLevel: 1,
  date: new Date("2021-10-16T16:23:05.276Z"),
  delay: 900000,
  acknowledged: false
};

export const PagerAlertAcknoledged: PagerEvent = {
  alert: {
    serviceId: "service1",
    message: "***Something really bad happened***",
    status: "healthy",
    id: "2cf959e7-928a-49a2-8c5e-76c400b9f34f"
  },
  ep: {
    id: "1234",
    serviceId: "service1",
    levels: [
      {
        target: { email: ["pepon@pepon.com", "cto@pepon.com"] }
      },
      {
        target: {
          email: ["cto@pepon.com", "bigboss@pepon.com"],
          sms: ["+1212345890"]
        }
      },
      {
        target: {
          email: ["joebiden@pepon.com", "pentagon@pepon.com"],
          sms: ["+1212345333"]
        }
      }
    ]
  },
  alertLevel: 1,
  date: new Date("2021-10-16T16:23:05.276Z"),
  delay: 900000,
  acknowledged: true
};
