import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Alert
} from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';
import stringsoflanguages from './locales/stringsoflanguages';

var PaymentID, PostDate, TranID, Ref, TrackID, Auth, OrderID;
var estimate_cost, consultant_id, contract_id;
var item,type;

class PaymentWebViewActivity extends Component {

    constructor(props) {
        super(props);
        this.callPaymentApi = this.callPaymentApi.bind(this);
        this.paymentDoneApi = this.paymentDoneApi.bind(this);
        this.state = {
            baseUrl: 'http://203.190.153.22/yys/admin/app_api/upay_payment_test',
            paymentDoneUrl: 'http://203.190.153.22/yys/admin/app_api/upay_payment_save',
            selectedLanguage: '',
            userId: '',
            paymentURL: ''
        };
    }


    static navigationOptions = {
        title: 'WebView'
    };

    showLoading() {
        this.setState({ loading: true });
    }

    hideLoading() {
        this.setState({ loading: false });
    }


    componentDidMount() {

        const { navigation } = this.props;
        item = navigation.getParam('item', 'no-listdata');
        estimate_cost = navigation.getParam('estimate_cost', 'no-estimated-cost');
        consultant_id = navigation.getParam('consultant_id', 'no-consultant-id');
        contract_id = navigation.getParam('contract_id', 'no-contract-id');


        console.log("estimated cost==" + estimate_cost)
        console.log("consultant_id ==" + consultant_id)
        console.log("contract_id ==" + contract_id)


        AsyncStorage.getItem('@user_id').then((userId) => {
            if (userId) {
                this.setState({ userId: userId });
                console.log("user id ====" + this.state.userId);

            }
        });

        this.callPaymentApi()

    }

    callPaymentApi() {

        var url = this.state.baseUrl;
        console.log('url:' + url);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                secure_pin: 'digimonk',
                name: 'digimonk',
                email_id: 'digimonk@digimonk.co',
                mobile_no: 'digimonk',
                success_url: 'https://i.redd.it/285f6fitz8b01.png',
                error_url: 'https://i.imgur.com/eYuY72L.png',
                amount: estimate_cost
            }),
        })
            .then(response => response.json())
            .then(responseData => {
                //this.hideLoading();
                if (responseData.status == '0') {
                    alert(responseData.message);
                } else {


                    this.setState({ paymentURL: responseData.paymentURL })


                    console.log('response object:======' + JSON.stringify(responseData))

                }

                //  console.log('response object:', responseData.question_log[0].post_date);
            })
            .catch(error => {
                // this.hideLoading();
                console.error(error);
            })

            .done();
    }

    _onNavigationStateChange(webViewState) {
        //  var query = new URLSearchParams(webViewState.url);
        //console.log("webview url  result ====" + query.get("Result"));
        var regex = /[?&]([^=#]+)=([^&#]*)/g,
            params = {},
            match;
        while (match = regex.exec(webViewState.url)) {
            params[match[1]] = match[2];
        }

        if (params.Result != null) {
            //console.log("success to=====" +params.Result)

            if (params.Result == "CAPTURED") {

                PaymentID = params.PaymentID,
                    PostDate = params.PostDate,
                    TranID = params.TranID,
                    Ref = params.Ref,
                    TrackID = params.TrackID,
                    Auth = params.Auth
                OrderID = params.OrderID

                this.paymentDoneApi()

                //console.log("success =====")
            } else {

                console.log("CONTRACT DETAILS DATA ===" + JSON.stringify(item))
                console.log("contract_id ===" + contract_id)
                
                Alert.alert(
                    //title
                    'Y LAW',
                    //body
                    stringsoflanguages.network_error_please_try_again,
                    [
                        {

                            text: 'ok',
                            onPress: () =>

                            this.props.navigation.goBack()
                         
                            
                        }
                    ],
            { cancelable: false }

                );

            // alert('error');
            console.log("do nothing =====")
        }
    }

    console.log("params===" + JSON.stringify(params))

        //     console.log("webview url ====" + JSON.stringify(webViewState.url))
    }

paymentDoneApi() {


    var url = this.state.paymentDoneUrl;
    console.log('url:' + url);
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            secure_pin: 'digimonk',
            contract_id: contract_id,
            consultant_id: consultant_id,
            user_id: this.state.userId,
            amount: estimate_cost,
            PaymentID: PaymentID,
            Result: 'CAPTURED',
            PostDate: PostDate,
            TranID: TranID,
            Ref: Ref,
            TrackID: TrackID,
            Auth: Auth,
            OrderID: OrderID

        }),
    })
        .then(response => response.json())
        .then(responseData => {
            this.hideLoading();
            if (responseData.status == '0') {
                alert(responseData.message);
            } else {
                Alert.alert(
                    //title
                    'Y LAW',
                    //body
                    responseData.message,
                    [
                        {
                            text: 'ok', onPress: () =>

                                this.props.navigation.navigate('ContractOrdersDetail', {
                                    item: item,
                                    type: "webview"
                                })

                        }
                    ],
                    { cancelable: false }

                );
                //   alert(responseData.message);
            }


        })
        .catch(error => {
            this.hideLoading();
            console.error(error);
        })

        .done();
}



render() {
    return (


        <WebView
            onNavigationStateChange={this._onNavigationStateChange.bind(this)}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{
                uri: this.state.paymentURL
            }}


        />

        // {this.state.loading && (
        //     <View style={styles.loading}>
        //         <ActivityIndicator size="large" color="#0093c8" />
        //     </View>
        // )}

    );
}
}


const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.5,
        //backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default PaymentWebViewActivity;
