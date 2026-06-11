sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "hanareadinessmain/helper/refreshTimeHelper",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
    "hanareadinessmain/helper/packageHelper",
    "hanareadinessmain/helper/objectNameHelper",
    "hanareadinessmain/helper/objectTypeHelper",
    "hanareadinessmain/helper/variantHelper",
    "sap/m/MessageToast",
    "sap/m/BusyDialog"
], function (Controller, refreshTimeHelper, Filter, FilterOperator, JSONModel, packageHelper, objectNameHelper, objectTypeHelper, variantHelper, MessageToast, BusyDialog) {
    "use strict";

    return Controller.extend("hanareadinessmain.controller.Dashboard", {

        onInit: function () {
            //refreshTimeHelper.updateTime(this.getView());
            var oModel = this.getOwnerComponent().getModel();

            packageHelper.loadPackages(this.getView(), oModel);
            objectTypeHelper.loadObjectTypes(this.getView(), oModel);
            variantHelper.loadVariants(this.getView(), oModel);


        },
        onPackageChange: function (oEvent) {

            var oComboBox = oEvent.getSource();

            if (!oComboBox.getSelectedKey()) {

                oComboBox.setValue("");
                oComboBox.setValueState("Error");
                oComboBox.setValueStateText(
                    "Please select a valid package"
                );

            } else {

                oComboBox.setValueState("None");

            }

            var sPackage =
                oEvent.getSource().getSelectedKey();

            var oModel =
                this.getOwnerComponent().getModel();

            var oObjectNameCombo =
                this.byId("objectNameSelect");

            oObjectNameCombo.setSelectedKey("");
            oObjectNameCombo.setValue("");


            objectNameHelper.loadProgramsByPackage(this.getView(),
                oModel,
                sPackage
            );

        },

        onRunScan: function () {

            var sPackage =
                this.byId("packageSelect").getSelectedKey();

            var sObjectType =
                this.byId("objectTypeSelect").getSelectedKey();

            var sObjectName =
                this.byId("objectNameSelect").getSelectedKey();

            var sVariant =
                this.byId("variantSelect").getSelectedKey();

            var aFilters = [];

            if (sPackage) {

                aFilters.push(
                    new Filter(
                        "DevClass",
                        FilterOperator.EQ,
                        sPackage
                    )
                );

            }

            if (sObjectType) {

                aFilters.push(
                    new Filter(
                        "ObjType",
                        FilterOperator.EQ,
                        sObjectType
                    )
                );

            }

            if (sObjectName) {

                aFilters.push(
                    new Filter(
                        "ObjName",
                        FilterOperator.EQ,
                        sObjectName
                    )
                );

            }

            if (sVariant) {

                aFilters.push(
                    new Filter(
                        "Variant",
                        FilterOperator.EQ,
                        sVariant
                    )
                );

            }

            var oModel =
                this.getOwnerComponent().getModel();

            //this.getView().setBusy(true);

            var oBusyDialog = new BusyDialog({
                //title: "ATC Scan",
                text: "Running scan, please wait..."
            });
            oBusyDialog.open();

            oModel.read("/ATCResultSet", {

                filters: aFilters,

                success: function (oData) {

                    var oATCModel =
                        new JSONModel({
                            ATCResults: oData.results
                        });

                    this.getOwnerComponent()
                        .setModel(
                            oATCModel,
                            "ATCModel"
                        );

                    // KPI Counts for Dashboard Cards
                    if (oData.results.length > 0) {

                        var oSummaryModel =
                            new JSONModel({

                                TotalObjects:
                                    oData.results[0].TotalObjects.trim(),

                                TotalFindings:
                                    oData.results[0].TotalFindings.trim(),

                                Priority1Count:
                                    oData.results[0].Priority1Count.trim(),

                                Priority2Count:
                                    oData.results[0].Priority2Count.trim()

                            });

                        this.getView().setModel(
                            oSummaryModel,
                            "summaryModel"
                        );

                    }

                    this.getView().setBusy(false);
                    oBusyDialog.close();
                    MessageToast.show(
                        "Scan completed successfully. " +
                        oData.results.length +
                        " findings loaded."
                    );

                }.bind(this),

                error: function () {
                    this.getView().setBusy(false);

                    oBusyDialog.close();
                    MessageToast.show(
                        "Scan failed. Please try again."
                    );

                }.bind(this)

            });

        },

        onATCResultsPress: function () {

            this.getOwnerComponent()
                .getRouter()
                .navTo("ATCResults");

        }

    });
});
