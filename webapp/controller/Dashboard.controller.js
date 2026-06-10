sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "hanareadinessmain/helper/refreshTimeHelper",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
    "hanareadinessmain/helper/packageHelper",
    "hanareadinessmain/helper/objectNameHelper",
    "hanareadinessmain/helper/objectTypeHelper",
    "hanareadinessmain/helper/variantHelper"
], function (Controller, refreshTimeHelper, Filter, FilterOperator, JSONModel, packageHelper, objectNameHelper, objectTypeHelper, variantHelper) {
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

            var aFilters = [

                new Filter(
                    "DevClass",
                    FilterOperator.EQ,
                    sPackage
                ),

                // new Filter(
                //     "ObjType",
                //     FilterOperator.EQ,
                //     sObjectType
                // ),

                // new Filter(
                //     "ObjName",
                //     FilterOperator.EQ,
                //     sObjectName
                // ),

                new Filter(
                    "Variant",
                    FilterOperator.EQ,
                    sVariant
                )

            ];

            var oModel =
                this.getOwnerComponent().getModel();

            this.getView().setBusy(true);
            

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

                    this.getView().setBusy(false);

                }.bind(this),

                error: function () {

                    this.getView().setBusy(false);

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
